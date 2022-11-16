export default function oraFunc2pgFunc(Qstr) {
  const initial_formatting = (Qstr) => {
    Qstr = Qstr.replace(/\(/g, "( ");
    Qstr = Qstr.replace(/\)/g, " )");
    //reduce multiple whitespaces to single whitespace.
    Qstr = Qstr.replace(/\s+/gis, " ");
    return Qstr;
  };
  let changedList = [];
  Qstr = initial_formatting(Qstr);

  //USER function to session_user
  Qstr = Qstr.replace(/\bUSER/gis, (match) => {
    changedList.push(match);
    return "session_user";
  });

  //UID function to pg_backend_pid();
  Qstr = Qstr.replace(/\bUID/gis, (match) => {
    changedList.push(match);
    return "pg_backend_pid()";
  });

  //NVL function to coalesce
  Qstr = Qstr.replace(/\bNVL\s*\(/gis, (match) => {
    changedList.push(match);
    return "coalesce(";
  });

  //remainder function to mod
  Qstr = Qstr.replace(/\bREMAINDER\s*\(/gis, (match) => {
    changedList.push(match);
    return "mod(";
  });

  //NLS_UPPER function to UPPER
  Qstr = Qstr.replace(/\bNLS_UPPER\s*\(/gis, (match) => {
    changedList.push(match);
    return "upper(";
  });

  //NLS_LOWER function to LOWER
  Qstr = Qstr.replace(/\bNLS_LOWER\s*\(/gis, (match) => {
    changedList.push(match);
    return "lower(";
  });

  //NLS_INITCAP function to INITCAP
  Qstr = Qstr.replace(/\bNLS_INITCAP\s*\(/gis, (match) => {
    changedList.push(match);
    return "INITCAP(";
  });

  //SYSTIMESTAMP function to current_timestamp
  Qstr = Qstr.replace(/\bSYSTIMESTAMP/gis, (match) => {
    changedList.push(match);
    return "current_timestamp";
  });

  //SYSDATE function to now()::timestamp
  Qstr = Qstr.replace(/\bSYSDATE/gis, (match) => {
    changedList.push(match);
    return "now()::timestamp";
  });

  //SYS_XMLAGG function to XMLAGG
  Qstr = Qstr.replace(/\bSYS_XMLAGG\s*\(/gis, (match) => {
    changedList.push(match);
    return "XMLAGG(";
  });

  //EMPTY_BLOB and EMPTY_CLOB function to
  Qstr = Qstr.replace(/\bEMPTY_BLOB+\(+(\s)*\)+|EMPTY_CLOB+\(+(\s)*\)+/gis,
    (match) => {
      changedList.push(match);
      return "\"\"";
    });


  //RAWTOHEX function to ENCODE
  Qstr = Qstr.replace(/RAWTOHEX\s*\((.*)\)/gis, (match, $1) => {
    changedList.push(match);
    return `encode(${$1}, 'hex')`;
  });

  //RAWTONHEX function to ENCODE
  Qstr = Qstr.replace(/RAWTONHEX\s*\((.*)\)/gis, (match, $1) => {
    changedList.push(match);
    return `encode(${$1}, 'hex')`;
  });

  //TO_NCHAR(number) function to ::text
  Qstr = Qstr.replace(/\bTO_NCHAR\s*\((.*)\)/gis, (match, $1) => {
    changedList.push(match, $1);
    return `${$1}::text`;
  })

  //TO_CLOB() function to ::text
  Qstr = Qstr.replace(/\bTO_CLOB\s*\((.*)\)/gis, (match, $1) => {
    changedList.push(match, $1);
    return `${$1}::text`;
  })

  //NLS_SORT function to - 변환생략

  //RATIO_TO_REPORT function to SUM
  const ratio_to_report = (qstr) => {
    qstr = qstr.replace(
      /RATIO_TO_REPORT\s*\(\s*(.*?)\s*\).*?FROM(.*?)(GROUP\s+BY\s*.*?\s*?)?;/gis,
      (match, $1) => {
        const column = $1;
        match = match.replace(
          /RATIO_TO_REPORT\s*\(\s*(.*?)\s*\)/i,
          (matching, $1) => {
            changedList.push(matching);
            return `sum(${$1})/sum(sum(${$1}))`;
          }
        );
        if (!match.match(/GROUP\s*BY/gi)) {
          match = match.replace(
            /FROM\s+[a-zA-Z0-9.,\'\"]*\s*/gi,
            (matching) => {
              return matching + ` GROUP BY ${column}`;
            }
          );
        }

        return match;
      }
    );
    return qstr;
  };
  Qstr = ratio_to_report(Qstr);




  //NUMTOYMINTERVAL function to NOW()
  Qstr = Qstr.replace(/\b(?:NUMTOYMINTERVAL)\s*\(\s*([^,]+)\s*,\s*\'([^\)]+)(\')\s*\)+/gis,
    (match, $1, $2) => {
      changedList.push(match, $1, $2);
      return `interval '${$1} ${$2}'`;
    });

  //TZ_OFFSET
  Qstr = Qstr.replace(/\bTZ_OFFSET\((.*)\)/gis, (match, $1) => {
    changedList.push(match);
    return `utc_offset FROM pg_catalog.pg_timezone_names WHERE name = ${$1}`;
  });

  //trunc(date) function to -변환생략
  // Qstr = Qstr.replace(/\bTRUNC\s*(.*)/gis, (match, $1) => {
  //   changedList.push(match, $1);
  //   return `date_trunc ${$1}`;
  // });

  //decode function to case ..when..then..else..end
  Qstr = Qstr.replace(/\bDECODE\s*\((.*?)\s*\)/gis, (match, $1) => {
    $1 = $1.split(",");
    changedList.push(match);
    const length = $1.length;
    let str = `case ${$1[0]}`;
    $1.shift();
    //default value 가 있을 때 즉 $1.length % 2 == 1 일때
    if (length % 2 === 0) {
      while ($1.length > 1) {
        str += ` when ${$1[0]} then ${$1[1]}`;
        $1.shift();
        $1.shift();
        if ($1.length === 1) {
          str += ` else ${$1[0]} end `;
        }
      }
    } else {
      while ($1.length >= 1) {
        str += ` when ${$1[0]} then ${$1[1]}`;
        $1.shift();
        $1.shift();
        if ($1.length === 0) {
          str += " end";
        }
      }
    }

    return str;
  });

  //CURRENT_DATE to (CURRENT_DATE + CURRENT_TIME)::timestamp
  Qstr = Qstr.replace(/\bCURRENT_DATE/gis, (match) => {
    changedList.push(match);
    return "(CURRENT_DATE + CURRENT_TIME)::timestamp";
  });

  //NEXT_DAY
  const day = Qstr.match(/NEXT_DAY\((.*?),(.*?)\)/is);
  let day_num = 0;
  const day_sun = ["'일요일' ", "'일' ", "'SUNDAY' ", "'SUN' ", "1 "];
  const day_mon = ["'월요일' ", "'월' ", "'MONDAY' ", "'MON' ", "2 "];
  const day_tue = ["'화요일' ", "'화' ", "'TUEDAY' ", "'TUE' ", "3 "];
  const day_wed = ["'수요일' ", "'수' ", "'WEDNESDAY' ", "'WED' ", "4 "];
  const day_thu = ["'목요일' ", "'목' ", "'THURSDAY' ", "'THUR' ", "5 "];
  const day_fri = ["'금요일' ", "'금' ", "'FRIDAY' ", "'FRI' ", "6 "];
  const day_sat = ["'토요일' ", "'토' ", "'SATURDAY' ", "'SAT' ", "7 "];

  //요구받은 요일을 정의하는 단계
  if (Qstr.match(/NEXT_DAY\((.*?),(.*?)\)/gis)) {
    if (day_sun.includes(day[2])) {
      day_num = 1;
    } else if (day_mon.includes(day[2])) {
      day_num = 2;
    } else if (day_tue.includes(day[2])) {
      day_num = 3;
    } else if (day_wed.includes(day[2])) {
      day_num = 4;
    } else if (day_thu.includes(day[2])) {
      day_num = 5;
    } else if (day_fri.includes(day[2])) {
      day_num = 6;
    } else if (day_sat.includes(day[2])) {
      day_num = 7;
    } else { day_num = "잘못된 요일입니다" };
  }

  Qstr = Qstr.replace(/NEXT_DAY\((.*?),(.*?)\)/gis,
    `case\nwhen extract(dow from current_date) < ${day_num}-1\n
    then now()::timestamp + CAST(${day_num}-1-extract(dow from current_date) ||' days' AS Interval)\n
    when extract(dow from current_date) > ${day_num}-1\n
    then now()::timestamp + CAST(${day_num}+6-extract(dow from current_date) ||' days' AS Interval)\n
    end`)

  //NANVL
  Qstr = Qstr.replace(/\b([\w]+)\s*(NANVL)\s*(\s*([^,]+)\s*,\s*([^\)]+)\s*)\)/gis,
    (match) => {
      changedList.push(match);
      return `\create function nanvl(p_to_test numeric, p_default numeric)\n\
        returns numeric\n\as\n\
        $$\n\
        select case when p_to_test = 'NaN' then p_default\n\
        else p_to_test\n\
        end;\n\
        $$\n\
        language sql; ${match}`;
    });

  //MONTHS_BETWEEN
  Qstr = Qstr.replace(/\b(MONTHS_BETWEEN)\s*((\s*([^,]+)\s*,\s*([^\)]+)\s*)+\))\s*./gis,
    (match, $1, $2) => {
      changedList.push(match, $1, $2);
      return `EXTRACT(YEAR FROM age${$2})*12)`;
    });

  //MEDIAN function to PERCENTILE_CONT
  Qstr = Qstr.replace(
    /\bMEDIAN\s*\((.*?)\)(\s*.*?)FROM\s+(\S{1,1000})/gis,
    (match, $1, $2, $3) => {
      changedList.push(match);
      return `PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY ${$1}) ${$2} FROM ${$3}`;
    }
  );

  //ITERATION_NUMBER function
  Qstr = Qstr.replace(
    /\blevel\s*(\w+)\s*(\w+)\s*(\w+)\s*(\w+)\s*(\w+)\s*(\<=)\s*(\d+)/gis,
    (match, $1, $2, $3, $4, $5, $6, $7) => {
      changedList.push(match, $1, $2, $3, $4, $5, $6, $7);
      return `generate_series(1, ${$7}) as 별명`;
    }
  );

  //SYS_CONNECT_BY_PATH - 변환생략

  //TO_YMINTERVAL function
  Qstr = Qstr.replace(
    /TO_YMINTERVAL\s*\(\s*'(?:\+|\-)?(\d{0,10})\-(\d{0,3})\s*'\s+(?:DEFALUT\s+.*\s+ON\s+CONVERSION\s+ERROR\s+)?\)/gis,
    (match, $1, $2) => {
      changedList.push(match);
      return `INTERVAL '${$1} years ${$2} months' as timestamp`;
    }
  );

  //TO_TIMESTAMP function
  Qstr = Qstr.replace(/\bTO_TIMESTAMP\s*\(.*?\)/gis, (match) => {
    changedList.push(match);
    return `${match}::timestamp `;
  });

  //TO_TIMESTAMP_TZ function
  Qstr = Qstr.replace(/\bTO_TIMESTAMP_TZ\s*\(.*?\)/gis, (match) => {
    changedList.push(match);
    match = match.replace(/TO_TIMESTAMP_TZ\s*\(/gis, "TO_TIMESTAMP(");
    return `${match} ::timestamp AT TIME ZONE 'Asia/Seoul' `;
  });

  //SESSIONTIMEZONE function
  Qstr = Qstr.replace(/\bSESSIONTIMEZONE/gis, "current_setting('timezone')");

  //NUMTODSINTERVAL function
  Qstr = Qstr.replace(
    /\bNUMTODSINTERVAL\s*\(\s*(\d{1,10})\s*,\s*'\s*(DAY|HOUR|MINUTE|SECOND)\s*'\s*\)/gis,
    (match, $1, $2) => {
      changedList.push(match);
      return `interval '${$1} ${$2}'`;
    }
  );

  //TO_NUMBER function
  // Qstr = Qstr.replace(/\bTO_NUMBER\s*\(.*?\)/gis, (match) => {
  //   changedList.push(match);
  //   let arr = match.match(/(?<=')(\S*)(?=')/gi);
  //   return `TO_NUMBER( ${arr[0]}, ${arr[1]} )`;
  // });

  Qstr = Qstr.replace(/\bTO_NUMBER\s*\(.*?\)/gis, (match) => {
    let arr = match.match(/'\s*?(\S*?)\s*?'/gi);
    return `TO_NUMBER( ${arr[0]}, ${arr[1]} )`;
  });
  //REVERSE function to ...

  //SYS_EXTRACT_UTC function to ...
  Qstr = Qstr.replace(/SYS_EXTRACT_UTC\s*\((.*?)\)/gis, (match, $1) => {
    changedList.push(match);
    $1 = $1.replace(/TIMESTAMP/gis, "");
    return `${$1} at time zone 'UTC' `;
  });
  //TO_LOB function to ... - 변환생략

  //TO_DSINTERVAL function to ...
  Qstr = Qstr.replace(
    /TO_DSINTERVAL\s*\(\s*('.*')\s*(?:DEFAULT\s+.*\s+ON\s+CONVERSION\s+ERROR)?\)/gis,
    (match, $1) => {
      changedList.push(match);
      return `${$1}::interval`;
    }
  );

  //LNNVL function to ...
  Qstr = Qstr.replace(/LNNVL\s*\((\s*([\w]+)\s*(\=)\s*([^\)]+)\s*)+\)/gis,
    (match, $1, $2, $3, $4) => {
      changedList.push(match, $1, $2, $3, $4);
      return `${$2} !=0 OR ${$2} IS ${$4} `;
    });

  //BIN_TO_NUM function to ...
  Qstr = Qstr.replace(/BIN_TO_NUM\s*\((.*?)\)/gis, (match, $1) => {
    changedList.push(match);
    $1 = $1.split(",").map((ele) => Number(ele)); //now $1 is array of Number 0 or 1 or error ?
    $1.forEach((ele) => {
      if ([0, 1].includes(ele) == false) {
        //이 부분에 오류코드 작성해주시면 될 것 같습니다.
        console.log("error, not 0 or 1");
      }
    });
    return `B'${$1.join("")}'::int`;
  });

  //LAST_DAY function to ...
  Qstr = Qstr.replace(/LAST_DAY\s*\(\s*(.*?)\s*\)/gis, (match, $1) => {
    changedList.push(match);
    return `(date_trunc('MONTH', (${$1})::timestamp) + INTERVAL '1 MONTH - 1 day')::timestamp`;
  });

  //INSTR function to ...
  Qstr = Qstr.replace(
    /INSTR(?:B|C|2|4)?\s*\(\s*('.*?')\s*,\s*('.*?')\s*(?:,\s*(.*?)\s*)?(?:,\s*(.*?)\s*)?\)/gis,
    (match, $1, $2) => {
      changedList.push(match);
      return `POSITION(${$2} IN ${$1})`;
    }
  );

  //BITAND function to ...
  Qstr = Qstr.replace(
    /\bBITAND\s*\((\s*.*?\s*),(\s*.*?\s*)\)/gis,
    (match, $1, $2) => {
      changedList.push(match);
      return `${$1} & ${$2}`;
    }
  );

  //FROM_TZ function to...
  Qstr = Qstr.replace(
    /FROM_TZ\s*\(\s*\S*\s*'(.*?)'\s*,\s*'(.*?)'\s*\)/gis,
    (match, $1, $2) => {
      changedList.push(match);
      return `TIMESTAMP '${$1}' AT TIME ZONE '${$2}'`;
    }
  );

  //ADD_MONTHS function to
  Qstr = Qstr.replace(
    /ADD_MONTHS\s*\((\s*.*?\s*),(\s*.*?\s*)\)/gis,
    (match, $1, $2) => {
      changedList.push(match);
      return `${$1} + interval '${$2}' month`;
    }
  );

  //SOUNDEX function to
  const SOUNDEX = Qstr.match(/SOUNDEX\(+(.*?)\)+/gis);
  if(SOUNDEX){
    const create_extension_soundex = "CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;\n"
  Qstr = create_extension_soundex + Qstr;
  changedList.push(SOUNDEX)
  };

  //STANDARD_HASH function to
  const STANDARD_HASH = Qstr.match(/STANDARD_HASH\(+(.*?)\)+/gis);
  if(STANDARD_HASH){
    const create_extension_STANDARD_HASH = "CREATE EXTENSION IF NOT EXISTS pgcrypto;\n"
    Qstr = Qstr.replace(/STANDARD_HASH\(+(.*?)\)+/gis,(_, $1) => {
      return `encode(digest(${$1},'sha1'),'hex')`;
    });
    Qstr = create_extension_STANDARD_HASH + Qstr;
  changedList.push(STANDARD_HASH)
  };

  //SYS_GUID function to
  const SYS_GUID = Qstr.match(/SYS_GUID\(\s*\)/gis);
  if(SYS_GUID){
    const create_extension_SYS_GUID = "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";\n"
    Qstr = Qstr.replace(/sys_guid\(\s*\)/gis,"uuid_generate_v1()");
    Qstr = create_extension_SYS_GUID + Qstr;
  changedList.push(SYS_GUID)
  };

  //XMLPARSE function to
  const XMLPARSE = Qstr.match(/XMLPARSE\(.*\)/gis);
  if(XMLPARSE && Qstr.includes("WELLFORMED")){
  Qstr = Qstr.replace(/WELLFORMED/gis,"");
  changedList.push("WELLFORMED")};



  Qstr = Qstr.replace(/ *;/igs, ";\n")

  changedList = [...new Set(changedList)];
  return { string: Qstr, changedList };
}
