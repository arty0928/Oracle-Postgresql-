const errorArray = [
    [   // from dual 제외
        [/\bABS\b/igs, /\bACOS\b/igs, /\bCURRENT_TIMESTAMP\b/igs, /\bASCII\b/igs, /\bASIN\b/igs, /\bATAN\b/igs, /\bATAN2\b/igs, /\bCEIL\b/igs, /\bCOALESCE\b/igs, /\bCONCAT\b/igs, /\bCOS\b/igs, /\bCOSH\b/igs, /\bEXP\b/igs, /\bFLOOR\b/igs, /\bINITCAP\b/igs, /\bLENGTH\b/igs, /\bLN\b/igs, /\bLOCALTIMESTAMP\b/igs, /\bLOG\b/igs, /\bLOWER\b/igs, /\bUPPER\b/igs, /\bLPAD\b/igs, /\bLTRIM\b/igs, /\bMOD\b/igs, /\bSIGN\b/igs, /\bSIN\b/igs, /\bSINH\b/igs, /\bSUBSTR\b/igs, /\bTRANSLATE\b/igs, /\bXMLPI\b/igs, /\bNULLIF\b/igs, /\bPOWER\b/igs, /\bREPLACE\b/igs, /\bROUND\b/igs, /\bRTRIM\b/igs],
        //동일
        [/\bAVG\b/igs, /\bCARDINALITY\b/igs, /\bCORR\b/igs, /\bCOUNT\b/igs, /\bCOVAR_POP\b/igs, /\bCOVAR_SAMP\b/igs, /\bCUME_DIST\b/igs, /\bEXTRACT\b/igs, /\bFIRST_VALUE\b/igs, /\bLAST_VALUE\b/igs, /\bGREATEST\b/igs, /\bLEAST\b/igs, /\bLAG\b/igs, /\bLEAD\b/igs, /\bMAX\b/igs, /\bMIN\b/igs, /\bSQRT\b/igs, /\bSTDDEV\b/igs, /\bSTDDEV_POP\b/igs, /\bSTDDEV_SAMP\b/igs, /\bSUM\b/igs, /\bTAN\b/igs, /\bTANH\b/igs, /\bTO_CHAR\b/igs, /\bTO_DATE\b/igs, /\bTRIM\b/igs, /\bUNISTR\b/igs, /\bUPPER\b/igs, /\bVAR_POP\b/igs, /\bVAR_SAMP\b/igs, /\bVARIANCE\b/igs, /\bVSIZE\b/igs, /\bWIDTH_BUCKET\b/igs, /\bXMLAGG\b/igs, /\bXMLCOMMENT\b/igs, /\bXMLCONCAT\b/igs, /\bXMLFOREST\b/igs, /\bXMLPARSE\b/igs, /\bNTH_VALUE\b/igs, /\bNTILE\b/igs, /\bPERCENT_RANK\b/igs, /\bPERCENT_COUT\b/igs, /\bPERCENT_DISC\b/igs, /\bRANK\b/igs, /\bREGEXP_REPLACE\b/igs, /\bREGR\b/igs, /\bROW_NUMBER\b/igs, /\bRPAD\b/igs, /\bSCN_TO_TIMESTAMP\b/igs, /\bSET\b/igs, /\bDENSE_RANK\b/igs],
        //예외처리 [0][2]
        [/\bXMLQUERY\b/igs, /\bAPPENDCHILDXML\b/igs, /\bASCIISTR\b/igs, /\bBFILENAME\b/igs, /\bCAST\b/igs, /\bCHARTOROWID\b/igs, /\bCLUSTER_ID\b/igs, /\bCLUSTER_PROBABILITY\b/igs, /\bCLUSTER_SET\b/igs, /\bCOLLECT\b/igs, /\bCOMPOSE\b/igs, /\bCONVERT\b/igs, /\bCORR_S\b/igs, /\bCORR_K\b/igs, /\bCV\b/igs, /\bDBTIMEZONE\b/igs, /\bDECONPOSE\b/igs, /\bDELETEXML\b/igs, /\bDEPTH\b/igs, /\bDEREF\b/igs, /\bDUMP\b/igs, /\bEXISTNODE\b/igs, /\bEXTRACT\b/igs, /\bEXTRACTVALUE\b/igs, /\bFEATURE_ID\b/igs, /\bFEATURE_SET\b/igs, /\bFEATURE_VALUE\b/igs, /\bFIRST\b/igs, /\bGROUP_ID\b/igs, /\bGROUPING\b/igs, /\bGROUPING_ID\b/igs, /\bHEXTORAW\b/igs, /\bHEXTOROW\b/igs, /\bINSERTCHILDXML\b/igs, /\bINSERTXMLBEFORE\b/igs, /\bLAST\b/igs, /\bMAKE_REF\b/igs, /\bNEW_TIME\b/igs, /\bNLS_CHARSET_DECL_LEN\b/igs, /\bNLS_CHARSET_ID\b/igs, /\bNLS_CHARSET_NAME\b/igs, /\bNLS_SORT\b/igs, /\bNVL2\b/igs, /\bORA_HASH\b/igs, /\bPATH\b/igs, /\bPOWERMULTISET\b/igs, /\bPOWERMULTISET_BY_CARDINALITY\b/igs, /\bPREDICTION\b/igs, /\bPREDICTION_COST\b/igs, /\bPREDICTION_DETAILS\b/igs, /\bPREDICTION_PROBABILITY\b/igs, /\bPREDICTION_SET\b/igs, /\bPRESENTNNV\b/igs, /\bPRESENTV\b/igs, /\bPREVIOUS\b/igs, /\bREFTOHEX\b/igs, /\bREGEXP_INSTR\b/igs, /\bREGEXP_SUBSTR\b/igs, /\bROUND\b/igs, /\bROWIDTOCHAR\b/igs, /\bROWIDTONCHAR\b/igs, /\bSKEWNESS_POP\b/igs, /\bSKEWNESS_SAMP\b/igs, /\bSTATS_BINOMIAL_TEST\b/igs, /\bSTATS_CROSSTAB\b/igs, /\bSTATS_F_TEST\b/igs, /\bSTATS_KS_TEST\b/igs, /\bSTATS_MODE\b/igs, /\bSTATS_MW_TEST\b/igs, /\bSTATS_ONE_WAY_ANOVA\b/igs, /\bSTATS_T_TEST\b/igs, /\bSTATS_WSR_TEST\b/igs, /\bSYS_CONNECT_BY_PATH\b/igs, /\bSYS_DBURIGEN\b/igs, /\bSYS_OP_ZONE_ID\b/igs, /\bSYS_TYPEID\b/igs, /\bSYS_XMLGEN\b/igs, /\bTIMESTAMP_TO_SCN\b/igs, /\bTO_APPROX_COUNT_DISTINCT\b/igs, /\bTO_APPROX_PERCENTILE\b/igs, /\bTO_BINARY_DOUBLE\b/igs, /\bTO_BINARY_FLOAT\b/igs, /\bTO_LOB\b/igs, /\bTO_MULTI_BYTE\b/igs, /\bTO_NCHAR\b/igs, /\bTO_SINGLE_BYTE\b/igs, /\bTRANSLATE+'...'+USING\b/igs, /\bTREAT\b/igs, /\bUPDATEXML\b/igs, /\bUSERENV\b/igs, /\bVALUE\b/igs, /\bXMLCDATA\b/igs, /\bXMLSEQUENCE\b/igs, /\bXMLSERIALIZE\b/igs, /\bXMLTABLE\b/igs, /\bXMLTRANSFORM\b/igs, /\bXMLCOLATTVAL\b/igs],
        // /SYS_CONTEXT\b/igs, /\bTO_CHAR\b/igs, 
        //치환
        [/\bSYS_XMLAGG\b/igs, /\bSYSDATE\b/igs, /\bSYSTIMESTAMP\b/igs, /\bUID\b/igs, /\bUSER\b/igs, /\bNLS_INITCAP\b/igs, /\bNLS_LOWER\b/igs, /\bNLS_UPPER\b/igs, /\bNVL\b/igs, /\bREMAINDER\b/igs],
        //EXTENSION
        [/\bSOUNDEX\b/igs, /\bSTANDARD_HASH\b/igs, /\bSYS_GUID\b/igs],
        //빈칸
        [/\bADD_MONTHS\b/igs, /\bBIN_TO_NUM\b/igs, /\bBITAND\b/igs, /\bCHR\b/igs, /\bCURRENT_DATE\b/igs, /\bDECODE\b/igs, /\bFROM_TZ\b/igs, /\bINSTR\b/igs, /\bLAST_DAY\b/igs, /\bLNNVL\b/igs, /\bITERATION_NUMBER\b/igs, /\bMEDIAN\b/igs, /\bMONTHS_BETWEEN\b/igs, /\bNANVL\b/igs, /\bNEXT_DAY\b/igs, /\bSYS_EXTRACT_UTC\b/igs, /\bTO_DSINTERVAL\b/igs, /\bTO_NUMBER\b/igs, /\bTO_TIMESTAMP\b/igs, /\bTO_TIMESTAMP_TZ\b/igs, /\bTO_YMINTERVAL\b/igs, /\bTZ_OFFSET\b/igs, /\bXMLROOT\b/igs, /\bREVERSE\b/igs, /\bNUMTODSINTERVAL\b/igs, /\bNUMTOYMINTERVAL\b/igs, /\bRATIO_TO_REPORT\b/igs, /\bSESSIONTIMEZONE/,],
        //공유규칙
        [/\bTO_CLOB\b/igs, /\bRAWTOHEX\b/igs, /\bRAWTONHEX\b/igs, /\bEMPTY_BLOB\b/igs, /\bEMPTY_CLOB\b/igs]
    ],
    [   // from dual 제외
        [/\bABS\b/igs, /\bACOS\b/igs, /\bCURRENT_TIMESTAMP\b/igs, /\bASCII\b/igs, /\bASIN\b/igs, /\bATAN\b/igs, /\bATAN2\b/igs, /\bCEIL\b/igs, /\bCOALESCE\b/igs, /\bCONCAT\b/igs, /\bCOS\b/igs, /\bCOSH\b/igs, /\bEXP\b/igs, /\bFLOOR\b/igs, /\bINITCAP\b/igs, /\bLENGTH\b/igs, /\bLN\b/igs, /\bLOCALTIMESTAMP\b/igs, /\bLOG\b/igs, /\bLOWER\b/igs, /\bUPPER\b/igs, /\bLPAD\b/igs, /\bLTRIM\b/igs, /\bMOD\b/igs, /\bSIGN\b/igs, /\bSIN\b/igs, /\bSINH\b/igs, /\bSUBSTR\b/igs, /\bTRANSLATE\b/igs, /\bNULLIF\b/igs, /\bPOWER\b/igs, /\bREPLACE\b/igs, /\bROUND\b/igs, /\bRTRIM\b/igs],
        //동일
        [/\bAVG\b/igs, /\bCARDINALITY\b/igs, /\bCORR\b/igs, /\bCOUNT\b/igs, /\bCOVAR_POP\b/igs, /\bCOVAR_SAMP\b/igs, /\bCUME_DIST\b/igs, /\bEXTRACT\b/igs, /\bFIRST_VALUE\b/igs, /\bLAST_VALUE\b/igs, /\bGREATEST\b/igs, /\bLEAST\b/igs, /\bLAG\b/igs, /\bLEAD\b/igs, /\bMAX\b/igs, /\bMIN\b/igs, /\bSQRT\b/igs, /\bSTDDEV\b/igs, /\bSTDDEV_POP\b/igs, /\bSTDDEV_SAMP\b/igs, /\bSUM\b/igs, /\bTAN\b/igs, /\bTANH\b/igs, /\bTO_CHAR\b/igs, /\bTO_DATE\b/igs, /\bTRIM\b/igs, /\bUNISTR\b/igs, /\bUPPER\b/igs, /\bVAR_POP\b/igs, /\bVAR_SAMP\b/igs, /\bVARIANCE\b/igs, /\bVSIZE\b/igs, /\bWIDTH_BUCKET\b/igs, /\bXMLAGG\b/igs, /\bXMLCOMMENT\b/igs, /\bXMLCONCAT\b/igs, /\bXMLFOREST\b/igs, /\bXMLPARSE\b/igs, /\bXMLPI\b/igs, /\bNTH_VALUE\b/igs, /\bNTILE\b/igs, /\bPERCENT_RANK\b/igs, /\bPERCENT_COUT\b/igs, /\bPERCENT_DISC\b/igs, /\bRANK\b/igs, /\bREGEXP_REPLACE\b/igs, /\bREGR\b/igs, /\bROW_NUMBER\b/igs, /\bRPAD\b/igs, /\bSCN_TO_TIMESTAMP\b/igs, /\bSET\b/igs, /\bDENSE_RANK\b/igs],
        //예외처리
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
        //치환
        [/\bXMLAGG\b/igs, /\bCURRENT_TIMESTAMP\b/igs, /\bPG_BACKEND_PID\b/igs, /\bINITCAP\b/igs, /\bLOWER\b/igs, /\bUPPER\b/igs, /\bCOALESCE\b/igs, /\bMOD\b/igs],
        //EXTENSION
        [/\bSOUNDEX\b/igs, "", /\bUUID_GENERATE_V1\b/igs, "", /\bREGEXP_SPLIT_TO_ARRAY\b/igs],
        //빈칸
        ["", "", "", "", "", /\bTIMESTAMPTZ\b/igs, /\bPOSITION\b/igs, /\bDATE_TRUNC\b/igs, "", /\bgenerate_series\b/igs, /\bPERCENTILE_CONT\b/igs, /\bAGE\b/igs, "", /\bINTERVAL\b/igs, "", "", "", "", /\bTO_NUMBER\b/igs, /\bTO_TIMESTAMP\b/igs, /\bTO_TIMESTAMP_TZ\b/igs, /\bINTERVAL\b/igs, /\bDATE_TRUNC\b/igs, /\bUTC_OFFSET\b/igs, "", "", "", "", "", "", "", "", "", "", "",]
    ],
    [
        //쿼리핸들러
        [/CONNECT\s*BY/igs]
    ]
]
export default function printMessage(inputQuery) {
    let qStr = inputQuery;
    let message = [];
    errorArray[0][2].forEach((oracleFun) => {
        if (qStr.match(oracleFun)) {
            let oracleFunOnly = (oracleFun + " ").split("/");
            oracleFunOnly = oracleFunOnly[1].split("\\b");
            let errorMessage = oracleFunOnly[1] + ": 별도의 변환 작업이 필요한 함수입니다.";
            message.push(errorMessage);
        }
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
    return {
        errorMessage: message,
        errorQueryMessage: queryMessage
    };
}
