const errorArray = [ // /\b\b/igs, 
    [   //예외처리 [0][0]
        [/\bXMLQUERY\b/igs, /\bAPPENDCHILDXML\b/igs, /\bASCIISTR\b/igs, /\bBFILENAME\b/igs, /\bCAST\b/igs, /\bCHARTOROWID\b/igs, /\bCLUSTER_ID\b/igs, /\bCLUSTER_PROBABILITY\b/igs, /\bCLUSTER_SET\b/igs, /\bCOLLECT\b/igs, /\bCOMPOSE\b/igs, /\bCONVERT\b/igs, /\bCORR_S\b/igs, /\bCORR_K\b/igs, /\bCV\b/igs, /\bDBTIMEZONE\b/igs, /\bDECONPOSE\b/igs, /\bDELETEXML\b/igs, /\bDEPTH\b/igs, /\bDEREF\b/igs, /\bDUMP\b/igs, /\bEXISTNODE\b/igs, /\bEXTRACT\b/igs, /\bEXTRACTVALUE\b/igs, /\bFEATURE_ID\b/igs, /\bFEATURE_SET\b/igs, /\bFEATURE_VALUE\b/igs, /\bFIRST\b/igs, /\bGROUP_ID\b/igs, /\bGROUPING\b/igs, /\bGROUPING_ID\b/igs, /\bHEXTORAW\b/igs, /\bINSERTCHILDXML\b/igs, /\bINSERTXMLBEFORE\b/igs, /\bLAST\b/igs, /\bMAKE_REF\b/igs, /\bNEW_TIME\b/igs, /\bNLS_CHARSET_DECL_LEN\b/igs, /\bNLS_CHARSET_ID\b/igs, /\bNLS_CHARSET_NAME\b/igs, /\bNLS_SORT\b/igs, /\bNVL2\b/igs, /\bORA_HASH\b/igs, /\bPATH\b/igs, /\bPOWERMULTISET\b/igs, /\bPOWERMULTISET_BY_CARDINALITY\b/igs, /\bPREDICTION\b/igs, /\bPREDICTION_COST\b/igs, /\bPREDICTION_DETAILS\b/igs, /\bPREDICTION_PROBABILITY\b/igs, /\bPREDICTION_SET\b/igs, /\bPRESENTNNV\b/igs, /\bPRESENTV\b/igs, /\bPREVIOUS\b/igs, /\bREFTOHEX\b/igs, /\bREGEXP_INSTR\b/igs, /\bREGEXP_SUBSTR\b/igs, /\bROWIDTOCHAR\b/igs, /\bROWIDTONCHAR\b/igs, /\bSKEWNESS_POP\b/igs, /\bSKEWNESS_SAMP\b/igs, /\bSTATS_BINOMIAL_TEST\b/igs, /\bSTATS_CROSSTAB\b/igs, /\bSTATS_F_TEST\b/igs, /\bSTATS_KS_TEST\b/igs, /\bSTATS_MODE\b/igs, /\bSTATS_MW_TEST\b/igs, /\bSTATS_ONE_WAY_ANOVA\b/igs, /\bSTATS_T_TEST\b/igs, /\bSTATS_WSR_TEST\b/igs, /\bSYS_CONNECT_BY_PATH\b/igs, /\bSYS_DBURIGEN\b/igs, /\bSYS_OP_ZONE_ID\b/igs, /\bSYS_TYPEID\b/igs, /\bSYS_XMLGEN\b/igs, /\bTIMESTAMP_TO_SCN\b/igs, /\bTO_APPROX_COUNT_DISTINCT\b/igs, /\bTO_APPROX_PERCENTILE\b/igs, /\bTO_BINARY_DOUBLE\b/igs, /\bTO_BINARY_FLOAT\b/igs, /\bTO_LOB\b/igs, /\bTO_MULTI_BYTE\b/igs, /\bTO_SINGLE_BYTE\b/igs, /TRANSLATE\s*\(\s*.*?using\s*(?:CHAR_CS|NCHAR_CS)\s*\)/igs, /\bTREAT\b/igs, /\bUPDATEXML\b/igs, /\bUSERENV\b/igs, /\bVALUE\b/igs, /\bXMLCDATA\b/igs, /\bXMLSEQUENCE\b/igs, /\bXMLSERIALIZE\b/igs, /\bXMLTABLE\b/igs, /\bXMLTRANSFORM\b/igs, /\bXMLCOLATTVAL\b/igs],
        ["XMLQUERY", "APPENDCHILDXML", "ASCIISTR", "BFILENAME", "CAST", "CHARTOROWID", "CLUSTER_ID", "CLUSTER_PROBABILITY", "CLUSTER_SET", "COLLECT", "COMPOSE", "CONVERT", "CORR_S", "CORR_K", "CV", "DBTIMEZONE", "DECONPOSE", "DELETEXML", "DEPTH", "DEREF", "DUMP", "EXISTNODE", "EXTRACT", "EXTRACTVALUE", "FEATURE_ID", "FEATURE_SET", "FEATURE_VALUE", "FIRST", "GROUP_ID", "GROUPING", "GROUPING_ID", "HEXTORAW", "INSERTCHILDXML", "INSERTXMLBEFORE", "LAST", "MAKE_REF", "NEW_TIME", "NLS_CHARSET_DECL_LEN", "NLS_CHARSET_ID", "NLS_CHARSET_NAME", "NLS_SORT", "NVL2", "ORA_HASH", "PATH", "POWERMULTISET", "POWERMULTISET_BY_CARDINALITY", "PREDICTION", "PREDICTION_COST", "PREDICTION_DETAILS", "PREDICTION_PROBABILITY", "PREDICTION_SET", "PRESENTNNV", "PRESENTV", "PREVIOUS", "REFTOHEX", "REGEXP_INSTR", "REGEXP_SUBSTR", "ROWIDTOCHAR", "ROWIDTONCHAR", "SKEWNESS_POP", "SKEWNESS_SAMP", "STATS_BINOMIAL_TEST", "STATS_CROSSTAB", "STATS_F_TEST", "STATS_KS_TEST", "STATS_MODE", "STATS_MW_TEST", "STATS_ONE_WAY_ANOVA", "STATS_T_TEST", "STATS_WSR_TEST", "SYS_CONNECT_BY_PATH", "SYS_DBURIGEN", "SYS_OP_ZONE_ID", "SYS_TYPEID", "SYS_XMLGEN", "TIMESTAMP_TO_SCN", "TO_APPROX_COUNT_DISTINCT", "TO_APPROX_PERCENTILE", "TO_BINARY_DOUBLE", "TO_BINARY_FLOAT", "TO_LOB", "TO_MULTI_BYTE", "TO_SINGLE_BYTE", "TRANSLATE ... USING", "TREAT", "UPDATEXML", "USERENV", "VALUE", "XMLCDATA", "XMLSEQUENCE", "XMLSERIALIZE", "XMLTABLE", "XMLTRANSFORM", "XMLCOLATTVAL"]
    ],
    [   // 도움말 페이지 확인 필요 [1][0]
        [/\bCORR\b/igs, /\bROUND\b/igs, /\bTO_NCHAR\b/igs, /\bTO_CHAR\b/igs, /\bTRUNC\b/igs],
        ["CORR", "ROUND", "TO_NCHAR", "TO_CHAR", "TRUNC"]
    ],
    [
        //쿼리핸들러 [2][0]
        [/CONNECT\s*BY/igs]
    ]
]
export default function printMessage(inputQuery) {
    let qStr = inputQuery;
    let message = [];
    let num = 0;
    errorArray[0][0].forEach((oracleFun) => {
        if (qStr.match(oracleFun)) {
            let errorMessage = errorArray[0][1][num] + ": 별도의 변환 작업이 필요한 함수입니다.";
            message.push(errorMessage);
        }
        num++;
    });

    let queryMessage = [];
    errorArray[2][0].forEach((queryErr) => {
        if (qStr.match(queryErr)) {
            let queryErrOnly = (queryErr + " ").split("/");
            queryErrOnly = queryErrOnly[1].split("\\s*");
            let errorQueryMessage = queryErrOnly[0] + queryErrOnly[1] + ": 별도의 변환 작업이 필요합니다.";
            queryMessage.push(errorQueryMessage);
        }

    });

    num = 0;
    let precautionsMessage = [];
    errorArray[1][0].forEach((precaution) => {
        if (qStr.match(precaution)) {
            let errorPrecautionsMessage = errorArray[1][1][num] + ": 변환은 되었으나, 지침 페이지를 확인해주세요.";
            precautionsMessage.push(errorPrecautionsMessage);
        }
        num++;
    });
    return {
        errorMessage: message,
        errorQueryMessage: queryMessage,
        errorPrecautionsMessage: precautionsMessage
    };
}
