const oracleFunction = [ 
    [// from dual 제외
    [/ABS/igs,/ACOS/igs,/CURRENT_TIMESTAMP/igs,/ASCII/igs,/ASIN/igs,/ATAN/igs,/ATAN2/igs,/CEIL/igs,/COALESCE/igs,/CONCAT/igs,/COS/igs,/COSH/igs,/EXP/igs,/FLOOR/igs,/INITCAP/igs,/LENGTH/igs,/LN/igs,/LOCALTIMESTAMP/igs,/LOG/igs,/LOWER/igs,/UPPER/igs,/LPAD/igs,/LTRIM/igs,/MOD/igs,/SIGN/igs,/SIN/igs,/SINH/igs,/SUBSTR/igs,/TRANSLATE/igs,/XMLPI/igs,/NULLIF/igs,/POWER/igs,/REPLACE/igs,/ROUND/igs,/RTRIM/igs],
    //동일
    [/AVG/igs,/CARDINALITY/igs,/CORR/igs,/COUNT/igs,/COVAR_POP/igs,/COVAR_SAMP/igs,/CUME_DIST/igs,/EXTRACT/igs,/FIRST_VALUE/igs,/LAST_VALUE/igs,/GREATEST/igs,/LEAST/igs,/LAG/igs,/LEAD/igs,/MAX/igs,/MIN/igs,/SQRT/igs,/STDDEV/igs,/STDDEV_POP/igs,/STDDEV_SAMP/igs,/SUM/igs,/TAN/igs,/TANH/igs,/TO_CHAR/igs,/TO_DATE/igs,/TRIM/igs,/UNISTR/igs,/UPPER/igs,/VAR_POP/igs,/VAR_SAMP/igs,/VARIANCE/igs,/VSIZE/igs,/WIDTH_BUCKET/igs,/XMLAGG/igs,/XMLCOMMENT/igs,/XMLCONCAT/igs,/XMLFOREST/igs,/XMLPARSE/igs,/NTH_VALUE/igs,/NTILE/igs,/PERCENT_RANK/igs,/PERCENT_COUT/igs,/PERCENT_DISC/igs,/RANK/igs,/REGEXP_REPLACE/igs,/REGR/igs,/ROW_NUMBER/igs,/RPAD/igs,/SCN_TO_TIMESTAMP/igs,/SET/igs,/DENSE_RANK/igs],
    //예외처리 [0][2]
    [/APPENDCHILDXML/igs,/ASCIISTR/igs,/BFILENAME/igs,/CAST/igs,/CHARTOROWID/igs,/CHR/igs,/CLUSTER_ID/igs,/CLUSTER_PROBABILITY/igs,/CLUSTER_SET/igs,/COLLECT/igs,/COMPOSE/igs,/CONVERT/igs,/CORR_S/igs,/CORR_K/igs,/CV/igs,/DBTIMEZONE/igs,/DECONPOSE/igs,/DELETEXML/igs,/FIRST/igs,/LAST/igs,/GROUP_ID/igs,/HEXTOROW/igs,/EXISTNODE/igs,/EXTRACT/igs,/EXTRACTVALUE/igs,/FEATURE_ID/igs,/FEATURE_SET/igs,/FEATURE_VALUE/igs,/GROUPING/igs,/GROUPING_ID/igs,/INSERTCHILDXML/igs,/INSERTXMLBEFORE/igs,/MAKE_REF/igs,/NEW_TIME/igs,/NLS_CHARSET_DECL_LEN/igs,/NLS_CHARSET_ID/igs,/NLS_CHARSET_NAME/igs,/SKEWNESS_POP/igs,/SKEWNESS_SAMP/igs,/STATS_BINOMIAL_TEST/igs,/STATS_CROSSTAB/igs,/STATS_F_TEST/igs,/STATS_KS_TEST/igs,/STATS_MODE/igs,/STATS_MW_TEST/igs,/STATS_ONE_WAY_ANOVA/igs,/STATS_T_TEST/igs,/STATS_WSR_TEST/igs,/SYS_OP_ZONE_ID/igs,/SYS_CONTEXT/igs,/SYS_DBURIGEN/igs,/SYS_TYPEID/igs,/SYS_XMLGEN/igs,/TIMESTAMP_TO_SCN/igs,/TO_APPROX_COUNT_DISTINCT/igs,/TO_APPROX_PERCENTILE/igs,/TO_BINARY_DOUBLE/igs,/TO_BINARY_FLOAT/igs,/TO_CHAR/igs,/TO_MULTI_BYTE/igs,/TO_SINGLE_BYTE/igs,/TRANSLATE+'...'+USING/igs,/TREAT/igs,/UPDATEXML/igs,/USERENV/igs,/VALUE/igs,/XMLCDATA/igs,/XMLCOLATTVAL/igs,/NVL2/igs,/ORA_HASH/igs,/PATH/igs,/POWERMULTISET/igs,/POWERMULTISET_BY_CARDINALITY/igs,/PREDICTION/igs,/PREDICTION_COST/igs,/PREDICTION_DETAILS/igs,/PREDICTION_PROBABILITY/igs,/PREDICTION_SET/igs,/PREVIOUS/igs,/ROUND/igs,/ROWIDTOCHAR/igs,/ROWIDTONCHAR/igs,/DUMP/igs,/DEREF/igs,/DEPTH/igs],
    //치환
    [/SYS_XMLAGG/igs,/SYSDATE/igs,/SYSTIMESTAMP/igs,/UID/igs,/USER/igs,/NLS_INITCAP/igs,/NLS_LOWER/igs,/NLS_UPPER/igs,/NVL/igs,/REMAINDER/igs],
    //EXTENSION
    [/SOUNDEX/igs,/STANDARD_HASH/igs,/SYS_GUID/igs,/REGEXP_INSTR/igs,/REGEXP_SUBSTR/igs],
    //빈칸
    [/ADD_MONTHS/igs,/BIN_TO_NUM/igs,/BITAND/igs,/CURRENT_DATE/igs,/DECODE/igs,/FROM_TZ/igs,/INSTR/igs,/LAST_DAY/igs,/LNNVL/igs,/ITERATION_NUMBER/igs,/MEDIAN/igs,/MONTHS_BETWEEN/igs,/NANVL/igs,/NEXT_DAY/igs,/SYS_CONNECT_BY_PATH/igs,/SYS_EXTRACT_UTC/igs,/TO_DSINTERVAL/igs,/TO_LOB/igs,/TO_NUMBER/igs,/TO_TIMESTAMP/igs,/TO_TIMESTAMP_TZ/igs,/TO_YMINTERVAL/igs,/TZ_OFFSET/igs,/XMLQUERY/igs,/XMLROOT/igs,/XMLSEQUENCE/igs,/XMLSERIALIZE/igs,/XMLTABLE/igs,/XMLTRANSFORM/igs,/REVERSE/igs,/NLS_SORT/igs,/NUMTODSINTERVAL/igs,/NUMTOYMINTERVAL/igs,/RATIO_TO_REPORT/igs,/SESSIONTIMEZONE/,],
    //공유규칙
    [/TO_CLOB/igs,/RAWTOHEX/igs,/RAWTONHEX/igs,/EMPTY_BLOB/igs,/EMPTY_CLOB/igs]
    ],
    [// from dual 제외
    [/ABS/igs,/ACOS/igs,/CURRENT_TIMESTAMP/igs,/ASCII/igs,/ASIN/igs,/ATAN/igs,/ATAN2/igs,/CEIL/igs,/CHR/igs,/COALESCE/igs,/CONCAT/igs,/COS/igs,/COSH/igs,/EXP/igs,/FLOOR/igs,/INITCAP/igs,/LENGTH/igs,/LN/igs,/LOCALTIMESTAMP/igs,/LOG/igs,/LOWER/igs,/UPPER/igs,/LPAD/igs,/LTRIM/igs,/MOD/igs,/SIGN/igs,/SIN/igs,/SINH/igs,/SUBSTR/igs,/TRANSLATE/igs,/NULLIF/igs,/POWER/igs,/REPLACE/igs,/ROUND/igs,/RTRIM/igs],
    //동일
    [/AVG/igs,/CARDINALITY/igs,/CORR/igs,/COUNT/igs,/COVAR_POP/igs,/COVAR_SAMP/igs,/CUME_DIST/igs,/EXTRACT/igs,/FIRST_VALUE/igs,/LAST_VALUE/igs,/GREATEST/igs,/LEAST/igs,/LAG/igs,/LEAD/igs,/MAX/igs,/MIN/igs,/SQRT/igs,/STDDEV/igs,/STDDEV_POP/igs,/STDDEV_SAMP/igs,/SUM/igs,/TAN/igs,/TANH/igs,/TO_CHAR/igs,/TO_DATE/igs,/TRIM/igs,/UNISTR/igs,/UPPER/igs,/VAR_POP/igs,/VAR_SAMP/igs,/VARIANCE/igs,/VSIZE/igs,/WIDTH_BUCKET/igs,/XMLAGG/igs,/XMLCOMMENT/igs,/XMLCONCAT/igs,/XMLFOREST/igs,/XMLPARSE/igs,/XMLPI/igs,/NTH_VALUE/igs,/NTILE/igs,/PERCENT_RANK/igs,/PERCENT_COUT/igs,/PERCENT_DISC/igs,/RANK/igs,/REGEXP_REPLACE/igs,/REGR/igs,/ROW_NUMBER/igs,/RPAD/igs,/SCN_TO_TIMESTAMP/igs,/SET/igs,/DENSE_RANK/igs,/NLS_SORT/igs],
    //예외처리
    ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",],
    //치환
    [/XMLAGG/igs,/CURRENT_TIMESTAMP/igs,/PG_BACKEND_PID/igs,/INITCAP/igs,/LOWER/igs,/UPPER/igs,/COALESCE/igs,/MOD/igs],
    //EXTENSION
    [/SOUNDEX/igs,"",/UUID_GENERATE_V1/igs,"",/REGEXP_SPLIT_TO_ARRAY/igs],
    //빈칸
    ["","","","","",/TIMESTAMPTZ/igs,/POSITION/igs,/DATE_TRUNC/igs,"",/generate_series/igs,/PERCENTILE_CONT/igs,/AGE/igs,"",/INTERVAL/igs,"","","","",/TO_NUMBER/igs,/TO_TIMESTAMP/igs,/TO_TIMESTAMP_TZ/igs,/INTERVAL/igs,/DATE_TRUNC/igs,/UTC_OFFSET/igs,"","","","","","","","","","","",]
    ]
    ]
export default function printMessage(inputQuery) {
    let qStr = inputQuery;
    let message = [];
    oracleFunction[0][2].forEach ((oracleFun) => {
        if(qStr.match(oracleFun)) {
            let oracleFunOnly = (oracleFun + " ").split("/");
            let errorMessage = oracleFunOnly[1] + ": 별도의 변환 작업이 필요한 함수입니다.";
            message.push(errorMessage);
        }
        
    })
    return {errorMessage: message}
}