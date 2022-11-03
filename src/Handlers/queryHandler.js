export default function ora2pg(Qstr) {
  //adds the matching query in this list.
  let changedList = [];

  const initial_formatting = (Qstr) => {
    Qstr = Qstr.replace(/\(/g, "( ");
    Qstr = Qstr.replace(/\)/g, " )");
    //reduce multiple whitespaces to single whitespace.
    Qstr = Qstr.replace(/\s+/gis, " ");
    return Qstr;
  };

  const final_formatting = (Qstr) => {
    //whitespace 맞춰주기.
    Qstr = initial_formatting(Qstr);
    //남아 있는 , 지워주기.
    Qstr = Qstr.replace(/,\s+\)/gis, " )");
    //최종적으로 whitespace 맞춰주기
    Qstr = initial_formatting(Qstr);
    return Qstr;
  };

  //initial formatting.
  Qstr = initial_formatting(Qstr);

  // removes from dual clause
  Qstr = Qstr.replace(/FROM\s*DUAL/gis, (match) => {
    changedList.push(match);
    return "";
  });
  //replace regexp_like(arg1, arg2) to arg1 ~ arg2
  Qstr = Qstr.replace(
    /\bREGEXP_LIKE\s*\(\s*(.*),(.*)\s*\)/gis,
    (match, $1, $2) => {
      changedList.push(match);
      return `${$1} ~ ${$2}`;
    }
  );

  //replace mod operator to %
  Qstr = Qstr.replace(
    /\(\B\s+((?:\w|\d)+)\s+mod\s+(.+)\s+\)\B/gis,
    (match, $1, $2) => {
      changedList.push(match);
      return `${$1} % ${$2}`;
    }
  );

  //replace return to return :new ;
  Qstr = Qstr.replace(
    /(?<=CREATE\s+(?:OR\s+REPLACE\s+)?(?:EDITIONABLE|NONEDITIONABLE)?TRIGGER.*)RETURN/gis,
    (match) => {
      changedList.push(match);
      return "RETURN : new";
    }
  );

  //get rid of label name from end clause.
  const end_label_name = (Qstr) => {
    const regex = new RegExp(/\<\<(.+)\>\>/, "igs");
    if (Qstr.match(regex)) {
      const labelName = Qstr.match(regex)[0].split("<")[2].split(">")[0];
      // console.log(`labelName : ${labelName}`);
      const reg = new RegExp("\\bEND" + "\\s+" + labelName, "igs");
      Qstr = Qstr.replace(reg, (match) => {
        changedList.push(match);
        return "END";
      });
      // console.log(`str after replacing : ${str}`);
    }
    return Qstr;
  };
  Qstr = end_label_name(Qstr);

  //adding block_comment_terminator for each block_comment
  const block_comment_terminator = (Qstr) => {
    const regex = new RegExp("\\B\\/\\*+", "igs");

    let matchArr = [];

    let match;
    while ((match = regex.exec(Qstr)) !== null) {
      //changedList.push(match[0]);
      matchArr.push(match.index);
    }
    for (let i = 1; i < matchArr.length; i++) {
      Qstr = Qstr.slice(0, matchArr[i]) + " */ " + Qstr.slice(matchArr[i]);
      if (i !== matchArr.length - 1) {
        matchArr[i + 1] += 4;
      }
    }
    return Qstr;
  };
  Qstr = block_comment_terminator(Qstr);

  //replace some generated_identity_cached syntax.
  const generated_identity_cached = (Qstr) => {
    if (
      Qstr.match(/GENERATED (ALWAYS)?|(BY DEFAULT (ON NULL)?)? AS IDENTITY/gis)
    ) {
      //replace by default on null to by default
      Qstr = Qstr.replace(/GENERETAE BY DEFUALT ON NULL/gis, (match) => {
        changedList.push(match);
        return "GENERATE BY DEFAULT";
      });
      //replace data type to (int , number, etc) to bigint
      Qstr = Qstr.replace(/(\S+\s)?GENERATED/gis, (match) => {
        changedList.push(match);
        return "bigint GENERATED";
      });
      //get rid of [ORDER|NOORDER][CYCLE|NOCYCLE][KEEP|NOKEEP][SCALE|NOSCALE]
      Qstr = Qstr.replace(
        /(NO)?ORDER|(NO)?CYCLE|(NO)?KEEP|(NO)?SCALE|(NO)?EXTEND/gis,
        (match) => {
          changedList.push(match);
          return "";
        }
      );
      //add parentheses after identity
      const re = new RegExp(/IDENTITY/, "igs");
      const idx = Qstr.search(re) + 9;
      Qstr = Qstr.slice(0, idx) + "( " + Qstr.slice(idx) + " )";
    }
    return Qstr;
  };
  Qstr = generated_identity_cached(Qstr);

  //removes USING INDEX ENABLE and NOVALIDATE clauses.
  const using_index_enable = (Qstr) => {
    //if the query contains CONSTRAINT then ...
    if (Qstr.match(/CONSTRAINT/gis)) {
      //removes USING INDEX ENABLE option
      Qstr = Qstr.replace(/USING\s+INDEX\s+ENABLE/gis, (match) => {
        changedList.push(match);
        return "";
      });
      //removes NOVALIDATE option
      Qstr = Qstr.replace(/NOVALIDATE/gis, (match) => {
        changedList.push(match);
        return "";
      });
      //removes ENABLE NOVALIDATE option
      Qstr = Qstr.replace(/ENABLE\s+NOVALIDATE/gis, (match) => {
        changedList.push(match);
        return "";
      });
    }
    return Qstr;
  };
  Qstr = using_index_enable(Qstr);

  //
  const enable_row_movement = (Qstr) => {
    //if query contains create or alter table..
    if (Qstr.match(/(CREATE|ALTER)\s+(?:.*)?TABLE/gis)) {
      //remove enable row movement clause
      Qstr = Qstr.replace(/ENABLE\s+ROW\s+MOVEMENT/gis, (match) => {
        changedList.push(match);
        return "";
      });
    }
    return Qstr;
  };
  Qstr = enable_row_movement(Qstr);

  //removes CHAR/BYTE from size specification
  Qstr = Qstr.replace(
    /\(\s+[0-9]{0,99999999999}\s+(CHAR|BYTE)\s+\)/,
    (match) => {
      match = match.replace(/(CHAR|BYTE)/gi, (match) => {
        changedList.push(match);
        return "";
      });
      return match;
    }
  );

  //fix float precision whenever neccessary
  Qstr = Qstr.replace(/FLOAT\(\s+([0-9]{0,3})\s+\)/gi, (match, group1) => {
    if (Number(group1) > 53) {
      match = match.replace(/\d{2,3}/gi, "53");
      return match;
    }
  });

  //removes ORGANIZATION_INDEX_COMPLEX or ORGANIZATION_INDEX_NOCOMPRESS
  if (Qstr.match(/CREATE/gi)) {
    Qstr = Qstr.replace(
      /ORGANIZATION\s+INDEX\s+(?:NO)?COMPRESS/gis,
      (match) => {
        changedList.push(match);
        return "";
      }
    );
  }

  //removes the FORCE clause from the CREATE VIEW or CREATE TYPE
  if (Qstr.match(/CREATE\s+.*\s+(VIEW|TYPE)/gis)) {
    Qstr = Qstr.replace(/FORCE\s+(?=(VIEW|TYPE))/gis, (match) => {
      changedList.push(match);
      return "";
    });
  }

  //remove editionable from the CREATE object in the source DDL
  Qstr = Qstr.replace(/CREATE.*EDITIONABLE/gis, (match) => {
    match = match.replace(/EDITIONABLE/gi, (match) => {
      changedList.push(match);
      return "";
    });
    return match;
  });

  //replacing * to 38 when used as NUMBER precision
  Qstr = Qstr.replace(/NUMBER\(\s+\*/gis, (match) => {
    match = match.replace(/\*/gis, (matching) => {
      changedList.push(matching);
      return "38";
    });
    return match;
  });

  //replace UROWID to VARCHAR
  Qstr = Qstr.replace(/UROWID/gis, (match) => {
    changedList.push(match);
    return "VARCHAR";
  });

  //replace NCLOB to CLOB
  Qstr = Qstr.replace(/NCLOB/gis, (match) => {
    changedList.push(match);
    return "CLOB";
  });

  //Removes the WITH READ ONLY clause from the CREATE VIEW in the source DDL
  if (Qstr.match(/CREATE\s+.*\s+VIEW/gis)) {
    Qstr = Qstr.replace(/WITH\s+READ\s+ONLY/gis, (match) => {
      changedList.push(match);
      return "";
    });
  }

  //if query includes CREATE SEQUENCE CACHED...
  if (Qstr.match(/CREATE\s+SEQUENCE.*CACHE/gis)) {
    Qstr = Qstr.replace(
      /((NO)?(ORDER|CYCLE|KEEP|SCALE))|GLOBAL|SESSION/gis,
      (match) => {
        changedList.push(match);
        return "";
      }
    );
  }

  //if query includes CREATE SEQUENCE NOCACHED...
  if (Qstr.match(/CREATE\s+SEQUENCE.*NOCACHE/gis)) {
    Qstr = Qstr.replace(
      /((NO)?(ORDER|KEEP|SCALE))|GLOBAL|SESSION/gis,
      (match) => {
        changedList.push(match);
        return "";
      }
    );
  }

  //remove nocache from CREATE SEQUENCE CLAUSE
  Qstr = Qstr.replace(/CREATE\s+SEQUENCE.*NOCACHE/gis, (match) => {
    match = match.replace(/NOCACHE/gis, (matching) => {
      changedList.push(matching);
      return "";
    });
    return match;
  });

  //removing NOPARTITION option from the create sequence DDL
  Qstr = Qstr.replace(/CREATE\s+SEQUENCE.*NOPARTITION/gis, (match) => {
    match = match.replace(/NOPARTITION/gis, (matching) => {
      changedList.push(matching);
      return "";
    });
    return match;
  });

  //removing NOKEEP option from the create sequence DDL
  Qstr = Qstr.replace(/CREATE\s+SEQUENCE.*(NO)?KEEP/gis, (match) => {
    match = match.replace(/(NO)?KEEP/gis, (matching) => {
      changedList.push(matching);
      return "";
    });
    return match;
  });

  //removing NOSCALE option from the create sequence DDL
  Qstr = Qstr.replace(/CREATE\s+SEQUENCE.*(NO)?SCALE/gis, (match) => {
    match = match.replace(/(NO)?SCALE/gis, (matching) => {
      changedList.push(matching);
      return "";
    });
    return match;
  });

  //removing SESSION option from the create sequence DDL
  Qstr = Qstr.replace(/CREATE\s+SEQUENCE.*(SESSION|GLOBAL)/gis, (match) => {
    match = match.replace(/(SESSION|GLOBAL)/gis, (matching) => {
      changedList.push(matching);
      return "";
    });
    return match;
  });

  //if query includes DDL with TRIGGER...REFERENCING...
  if (Qstr.match(/TRIGGER.*REFERENCING/gis)) {
    //replace OLD AS [alias to be matched] to old
    Qstr = Qstr.replace(/(?<=OLD\s+AS)(\s+\w+)(?=\s+)/gis, (match) => {
      changedList.push(match);
      match = " old";
      return match;
    });
    //replace NEW AS [alias to be matched] to new
    Qstr = Qstr.replace(/(?<=NEW\s+AS)(\s+\w+)(?=\s+)/gis, (match) => {
      changedList.push(match);
      match = " new";
      return match;
    });
  }

  //replace BITMAP INDEX to INDEX
  Qstr = Qstr.replace(/BITMAP\s+INDEX/gis, (match) => {
    changedList.push(match);
    return "INDEX";
  });

  //Removes NLS_CALENDAR=GREGORIAN option from the table DDL
  Qstr = Qstr.replace(/,\s+'NLS_CALENDAR=(\w+)'/gis, (match) => {
    changedList.push(match);
    return "";
  });

  //remove LOCAL and PARTITION CLAUSE in creat or alter index.
  Qstr = Qstr.replace(
    /(?:CREATE|ALTER)\s+(?:UNIQUE\s+|BITMAP\s+|MULTIVALUE\s+)?INDEX.*LOCAL(?:\(.*\))?/gis,
    (match) => {
      match = match.replace(/LOCAL(?:\(.*\))?/gis, (matching) => {
        changedList.push(matching);
        return "";
      });
      return match;
    }
  );

  //removes NULL from attributes of user defined types.
  Qstr = Qstr.replace(
    /(?<=CREATE\s+(?:OR\s+REPLACE\s+)?TYPE.*)\(.*\)/gis,
    (match) => {
      match = match.replace(/NULL/gis, (matching) => {
        changedList.push(matching);
        return "";
      });
      return match;
    }
  );

  //transforms BINARY_FLOAT to REAL
  Qstr = Qstr.replace(/(?<=\(\s+.*)BINARY_FLOAT(?=.*\))/gis, (match) => {
    changedList.push(match);
    return "REAL";
  });

  //transforms BINARY_DOUBLE to DOUBLE PRECISION
  Qstr = Qstr.replace(/(?<=\(\s+.*)BINARY_DOUBLE(?=.*\))/gis, (match) => {
    changedList.push(match);
    return "DOUBLE PRECISION";
  });

  //transforms TIMESTAMP WITH LOCAL TIME ZONE to TIMESTAMP WITH TIME ZONE by removing LOCAL keyword.
  Qstr = Qstr.replace(
    /TIMESTAMP\s+(\(.*\)\s+)?WITH\s+LOCAL\s+TIME\s+ZONE/gis,
    (match) => {
      match = match.replace(/\s+LOCAL/gis, (matching) => {
        changedList.push(matching);
        return "";
      });
      return match;
    }
  );

  //removes DAY precision from INTERVAL type in table definition.
  Qstr = Qstr.replace(
    /INTERVAL\s+DAY\s+(\(\s+\d*\s+\))?\s+TO\s+SECOND\s+(\(\s+\d*\s+\))?/gis,
    (match) => {
      match = match.replace(/(?<=DAY\s+)\(\s+\d\s+\)/gis, (matching) => {
        changedList.push(matching);
        return "";
      });
      return match;
    }
  );

  //transforms BFILE datatype to TEXT
  Qstr = Qstr.replace(/(?<=\(\s+.*)BFILE(?=.*\))/gis, (match) => {
    match = match.replace(/BFILE/gis, (matching) => {
      changedList.push(matching);
      return "TEXT";
    });
    return match;
  });

  ////PARTITION 뒤에 오는 'TIMESTAMP'라는 단어를 소거함... 조건을 이렇게 줘도 괜찮을지 모르겠네요
  Qstr = Qstr.replace(/(?<=PARTITION+(?:.*))\bTIMESTAMP+/gis, (match) => {
    changedList.push(match);
    return "";
  });

  //removes YEAR precision from INTERVAL type in table definition.
  Qstr = Qstr.replace(
    /INTERVAL\s+YEAR\s+(\(\s+\d*\s+\))?\s+TO\s+MONTH/gis,
    (match) => {
      match = match.replace(/(?<=YEAR\s+)\(\s+\d\s+\)/gis, (matching) => {
        changedList.push(matching);
        return "";
      });
      return match;
    }
  );

  //Sets the precision of TIMESTAMP data type columns to a maximum of 6
  Qstr = Qstr.replace(/TIMESTAMP(?:\s+)?\(\s+(\d)\s+\)/gis, (match, group1) => {
    if (Number(group1) > 6) {
      match = match.replace(/\d/, (match) => {
        changedList.push(match);
        return "6";
      });
    }
    return match;
  });

  //Removes PARTITION from the create sequence DDL statement.

  //Transforms OLDCHAR2 data type to VARCHAR
  Qstr = Qstr.replace(/(?<=\(\s+.*)OLDCHAR2(?=.*\))/gis, (match) => {
    changedList.push(match);
    return "VARCHAR";
  });

  //Transforms the keyword PARALLEL_ENABLE to PARALLEL SAFE for FUNCTION and PACKAGE BODY
  Qstr = Qstr.replace(
    /(?<=CREATE\s+((?:OR\s+REPLACE\s+))?(((?:NON)?EDITIONABLE\s+))?(FUNCTION.*|PACKAGE\s+BODY.*))PARALLEL_ENABLE/gis,
    (match) => {
      changedList.push(match);
      return "PARALLEL SAFE";
    }
  );

  //Removes unsupported logging/nologging options from CREATE INDEX statement.
  Qstr = Qstr.replace(
    /(?<=CREATE(?:\s+UNIQUE|\s+BITMAP|\s+MULTIVALUE)?\s+INDEX.*)(NO)?LOGGING/gis,
    (match) => {
      changedList.push(match);
      return "";
    }
  );
  //Removes unsupported compress/nocompress options from CREATE INDEX statement.
  Qstr = Qstr.replace(
    /(?<=CREATE(?:\s+UNIQUE|\s+BITMAP|\s+MULTIVALUE)?\s+INDEX.*)(NO)?COMPRESS+((?:\s+\d+)|(?:\s+ADVANCED\s+LOW)|(?:\s+ADVANCED\s+HIGH))?/gis,
    (match) => {
      changedList.push(match);
      return "";
    }
  );
  //Removes SCALE from the create sequence DDL statement.
  Qstr = Qstr.replace(
    /(?<=CREATE\s+SEQUENCE.*)SCALE\s+(NO)?EXTEND/gis,
    (match) => {
      changedList.push(match);
      return "";
    }
  );

  //Removes REVERSE clause from index DDL statement.
  Qstr = Qstr.replace(
    /(?<=CREATE\s+(?:UNIQUE\s+|BITMAP\s+)?INDEX\s+.*ON.*)REVERSE/gis,
    (match) => {
      changedList.push(match);
      return "";
    }
  );

  //Removes size specification from integer types in SPL objects.
  Qstr = Qstr.replace(
    /(?<=(?:CREATE|ALTER)(?: OR REPLACE)? PACKAGE.*)(?:(?:(INTEGER)(?: )?\((?: )?\d+(?: )?\))|(?:(INT)(?: )?\((?: )?\d+(?: )?\))|(?:(SAMLLINT)(?: )?\((?: )?\d+(?: )?\)))/gis,
    (match, $1) => {
      changedList.push(match);
      return $1;
    }
  );

  //Converts PIPELINED clause in pipelined functions to SETOF RECORD.
  Qstr = Qstr.replace(
    /(?<=(?:CREATE|ALTER)\s+(?:OR REPLACE\s+)?(?:(?:NON)?EDITIONABLE)?FUNCTION.*RETURN.*)PIPELINED/gis,
    (match) => {
      changedList.push(match);
      return "SETOF RECORD";
    }
  );

  //Converts PIPE ROW statement in pipelined functions to RETURN NEXT.
  Qstr = Qstr.replace(/PIPE\s+ROW/gis, (match) => {
    changedList.push(match);
    return "RETURN NEXT";
  });

  //Removes SHARING=METADATA clause from the source DDL.
  Qstr = Qstr.replace(/SHARING=(?:METADATA|NONE)/gis, (match) => {
    changedList.push(match);
    return "";
  });

  //Removes Supplemental logging clause from the table DDL
  Qstr = Qstr.replace(
    /SUPPLEMENTAL LOG (?:(?:GROUP.*\(.*\)\s+(?:ALWAYS)?)|(?:DATA.*\(.*\)\s+COLUMNS))/gis,
    (match) => {
      changedList.push(match);
      return "";
    }
  );

  //Removes DEFERRABLE clause from CHECK and NOT NULL constraints in table DDL.
  Qstr = Qstr.replace(
    /(?:DEFERRABLE)?(?:(?:INITIALLY DEFERRED)|(?:INITIALLY IMMEDIATE)?)(?:(?:ENABLE VALIDATE)|(?:ENABLE NOVALIDATE)|(?:DISABLE VALIDATE)|(?:DISABLE NOVALIDATE))?/gis,
    (match) => {
      changedList.push(match);
      return "";
    }
  );

  //Removes NO INMEMORY clause from the source DDL
  Qstr = Qstr.replace(/NO\s+INMEMORY/gis, (match) => {
    changedList.push(match);
    return "";
  });

  //Removes RELY from the PRIMARY KEY CONSTRAINT clause in CREATE TABLE statement
  Qstr = Qstr.replace(/PRIMARY KEY.*(RELY)/gis, (match) => {
    match = match.replace(/RELY/gis, (matching) => {
      changedList.push(matching);
      return "";
    });
    return match;
  });

  //Removes RELY from REFERENCES clause of the ALTER TABLE ADD FOREIGN KEY statement
  Qstr = Qstr.replace(
    /(?<=ALTER TABLE.*CONSTRAINT.*REFERENCES.*)RELY.*;/gis,
    (match) => {
      changedList.push(match);
      return "";
    }
  );

  //Removes DEFAULT COLLATION clause from the source DDL for tables and views
  Qstr = Qstr.replace(/DEFAULT COLLATION USING_NLS_COMP/gis, (match) => {
    changedList.push(match);
    return "";
  });

  //Removes "CONSTRAINT constraint_name NOT NULL DISABLE" clause from the source DDL for tables.
  Qstr = Qstr.replace(
    /CONSTRAINT+(?:.*)?\s(not\snull)+\sdisable+\s/gis,
    (match) => {
      changedList.push(match);
      return "";
    }
  );

  //Removes "NOT NULL DISABLE" clause from the source DDL for tables.

  //Removes "CONSTRAINT constraint_name CHECK|UNIQUE|PRIMARY KEY parameters DISABLE" clause from the source DDL for tables.
  Qstr = Qstr.replace(
    /(?<=CREATE.*TABLE\s+.*\(.*)(CONSTRAINT.*(UNIQUE|PRIMARY KEY|CHECK( )?\(.*\))\s+DISABLE)/gis,
    (match) => {
      changedList.push(match);
      return "";
    }
  );

  //Removes "CHECK|UNIQUE|PRIMARY KEY parameters DISABLE" clause from the source DDL for tables.

  //Removes USING INDEX REVERSE clause from CREATE TABLE statement.
  Qstr = Qstr.replace(
    /(?<=CREATE\s+(?:(?:(?:GLOBAL\s+|PRIVATE\s+)TEMPORARY\s+)|(?:SHARED\s+)|(?:DUPLICATED\s+)|(?:(?:IMMUTABLE\s+)?BLOCKCHAIN\s+))?TABLE.*\(.*)USING\s+INDEX\s+REVERSE/gis,
    (match) => {
      changedList.push(match);
      return "";
    }
  );

  //Converts SIMPLE_INTEGER data type to INTEGER type
  Qstr = Qstr.replace(/SIMPLE_INTEGER/gs, (match) => {
    changedList.push(match);
    return "INTEGER";
  });
  //Converts SIMPLE_INTEGER data type to INTEGER type
  Qstr = Qstr.replace(/NATURAL/gs, (match) => {
    changedList.push(match);
    return "INTEGER";
  });

  //Removes NOT NULL clause from VARRAY collection type declaration within PL/SQL object.

  //Removes NOT NULL clause from nested table type declaration within PL/SQL object.

  //Removes NOT NULL clause from index-by table type declaration within PL/SQL object.

  //Converts ARRAY to VARRAY collection type declaration within PL/SQL object

  //Removes STORE IN (tablespace) clause from PARTITIONED TABLE that has a PARTITION BY HASH or PARTITION BY RANGE syntax

  //Replaces VIRTUAL keyword with STORED in TABLE definition

  //Removes empty spaces from operators i.e. < =, > =, ! = or < >
  Qstr = Qstr.replace(
    /((?<=<)\s+(?==)|((?<=>)\s+(?==))|((?<=!)\s+(?==))|((?<=<)\s+(?=>)))/gis,
    (match) => {
      changedList.push(match);
      return "";
    }
  );

  //Removes schema-name from the name of INDEX in CREATE INDEX definition
  Qstr = Qstr.replace(
    /(?<=CREATE\s+(?:UNIQUE\s+|BITMAP\s+|MULTIVALUE\s+)INDEX)(.*)\..*(?=ON)/gis,
    (match) => {
      match = match.replace(/.*(?=\.)/gis, (matching) => {
        changedList.push(matching);
        return "";
      });
      match = match.replace(/\./gis, (matching) => {
        changedList.push(matching);
        return " ";
      });
      return match;
    }
  );

  //Possibly corresponding PostgreSQL variables: http://www.postgresql.org/docs/current/static/functions-info.html
  //replace sys context
  Qstr = Qstr.replace(
    /SYS_CONTEXT\s*\(\s*'USERENV'\s*,\s*'(OS_USER|SESSION_USER|AUTHENTICATED_IDENTITY)'\s*\)/gis,
    (match) => {
      changedList.push(match);
      return "session_user";
    }
  );
  Qstr = Qstr.replace(
    /SYS_CONTEXT\s*\(\s*'USERENV'\s*,\s*'BG_JOB_ID'\s*\)/gis,
    (match) => {
      changedList.push(match);
      return "pg_backend_pid()";
    }
  );
  Qstr = Qstr.replace(
    /SYS_CONTEXT\s*\(\s*'USERENV'\s*,\s*'(CLIENT_IDENTIFIER|PROXY_USER)'\s*\)/gis,
    (match) => {
      changedList.push(match);
      return "session_user";
    }
  );
  Qstr = Qstr.replace(
    /SYS_CONTEXT\s*\(\s*'USERENV'\s*,\s*'CURRENT_SCHEMA'\s*\)/gis,
    (match) => {
      changedList.push(match);
      return "current_schema";
    }
  );
  Qstr = Qstr.replace(
    /SYS_CONTEXT\s*\(\s*'USERENV'\s*,\s*'CURRENT_USER'\s*\)/gis,
    (match) => {
      changedList.push(match);
      return "current_user";
    }
  );
  Qstr = Qstr.replace(
    /SYS_CONTEXT\s*\(\s*'USERENV'\s*,\s*'(DB_NAME|DB_UNIQUE_NAME)'\s*\)/gis,
    (match) => {
      changedList.push(match);
      return "current_database";
    }
  );
  Qstr = Qstr.replace(
    /SYS_CONTEXT\s*\(\s*'USERENV'\s*,\s*'(HOST|IP_ADDRESS)'\s*\)/gis,
    (match) => {
      changedList.push(match);
      return "inet_client_addr()";
    }
  );
  Qstr = Qstr.replace(
    /SYS_CONTEXT\s*\(\s*'USERENV'\s*,\s*'SERVER_HOST'\s*\)/gis,
    (match) => {
      changedList.push(match);
      return "inet_server_addr()";
    }
  );

  //Removes the CACHE keyword from CREATE TABLE statements to make them compatible with EDB Postgres Advanced Server.

  //Removes ALTER TRIGGER <triggerName> ENABLE statement or Transforms ALTER TRIGGER <triggerName> DISABLE statements to EDB Postgres Advanced Server compatible syntax

  //Removes NAME clause and associated label name from SET TRANSACTION statements inside PL/SQL block.

  //final formatting
  Qstr = final_formatting(Qstr);
  changedList = [...new Set(changedList)];
  return { string: Qstr, changedList };
}