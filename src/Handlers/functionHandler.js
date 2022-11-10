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
  Qstr = Qstr.replace(/\bINITCAP\s*\(/gis, (match) => {
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

  //empty blob and empty clob

  //rawtohex to encode

  //rawtonhex to encode

  //to_nchar(number)

  //to_clob()

  //NLS_SORT

  //RATIO_TO_REPORT

  //NUMTOYMINTERVAL

  //trunc(date)

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

  //NANVL

  //MONTHS_BETWEEN

  //MEDIAN function to PERCENTILE_CONT
  Qstr = Qstr.replace(
    /\bMEDIAN\s*\((.*?)\)(\s*.*?)FROM\s+(\S{1,1000})/gis,
    (match, $1, $2, $3) => {
      changedList.push(match);
      return `PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY ${$1}) ${$2} FROM ${$3}`;
    }
  );

  //ITERATION_NUMBER function

  //SYS_CONNECT_BY_PATH

  //TO_YMINTERVAL function
  Qstr = Qstr.replace(
    /TO_YMINTERVAL\s*\(\s*'(?:\+|\-)?(\d{0,10})\-(\d{0,3})\s*'\s+(?:DEFALUT\s+.*\s+ON\s+CONVERSION\s+ERROR\s+)?\)/gis,
    (match, $1, $2) => {
      changedList.push(match);
      return `INTERVAL '${$1} years ${$2} months' as timestamp`;
    }
  );
  //TO_TIMESTAMP_TZ function
  Qstr = Qstr.replace(/\bTO_TIMESTAMP_TZ\s*\(.*?\)/gis, (match) => {
    changedList.push(match);
    match = match.replace(/TO_TIMESTAMP_TZ\s*\(/gis, "TO_TIMESTAMP(");
    return `${match} ::timestamp AT TIME ZONE '15:0' `;
  });
  //TO_TIMESTAMP function
  Qstr = Qstr.replace(/\bTO_TIMESTAMP\s*\(.*?\)/gis, (match) => {
    changedList.push(match);
    return `${match}::timestamp `;
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
  //TO_LOB function to ...

  //TO_DSINTERVAL function to ...
  Qstr = Qstr.replace(
    /TO_DSINTERVAL\s*\(\s*('.*')\s*(?:DEFAULT\s+.*\s+ON\s+CONVERSION\s+ERROR)?\)/gis,
    (match, $1) => {
      changedList.push(match);
      return `${$1}::interval`;
    }
  );
  //LNNVL function to ...

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
      return `TIMESTAMP WITH TIME ZONE '${$1} ${$2}'`;
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

  Qstr = Qstr.replace(/ *;/gis, ";\n");
  changedList = [...new Set(changedList)];
  return { string: Qstr, changedList };
}
