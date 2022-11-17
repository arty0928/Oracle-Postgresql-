import React from "react";
import { useNavigate } from "react-router-dom";

function Functions() {
  let navigate = useNavigate();
  return (
    // <!-- component -->
    <div>
      <section className="text-gray-700">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1
              className="mt-6 text-center sm:text-4xl sm:font-bold tracking-tight text-gray-900
                         text-3xl font-bold text-center title-font text-gray-900 mb-4"
            >
              Exception Functions
            </h1>
            <p
              className="
                        text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto"
            >
              The most common questions about how our business works and what
              can do for you.
              <br></br>
              <button
                onClick={() => {
                  navigate("/Precautions");
                }}
                className="
                                mt-6 text-center text-xl font-bold tracking-tight text-indigo-600"
              >
                Back to Precautions
              </button>
            </p>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            <div className="w-full lg:w-1/2 px-4 py-2">

              {/* NLS 관련 함수 */}
              <details className="mb-4 bg-gray-200 rounded-md">
                <summary className="font-bold leading-7 bg-indigo-300 rounded-md px-4 py-2 ">
                  NLS 관련 함수
                </summary>

                <div className="pl-8 px-4 pt-2">
                  <p>postgresql.conf 설정 파일</p>
                  <div className="m-2 p-3 pl-5 font-bold bg-gray-300 rounded-md">
                    {" "}
                    유저 선택 언어로 메세지가 번역되려면 NLS 사용<br></br>
                    다른 지역 지원 기능과는 독립
                  </div>
                  <ul className="ml-5 leading-7">
                    <li>
                      <b>- initdb --locale :</b>
                      <span className="block pl-4">
                        다른 지역(locale)을 사용하고 싶은 경우<br></br>
                        시스템의 로케일 설정이 불분명한 경우
                      </span>
                    </li>
                    <li>
                      <b>SHOW:</b>{" "}
                      <span className="block pl-4">
                        사용 중인 지역 설정을 확인
                      </span>
                    </li>
                    <li>
                      <b>locale -a :</b>{" "}
                      <span className="block pl-4">
                        지역 지원 기능이 정상적으로 동작하지 않는 경우 operating
                        system 이 제공하는 경우에 커멘드를 사용
                      </span>
                    </li>
                    <li>
                      <b>PostgreSQL JDBC :</b>{" "}
                      <span className="block pl-4">
                        MULE_INTERNAL,LATIN6,LATIN8, LATIN10 를 지원하지 않음
                      </span>
                    </li>
                    <li>
                      <b>PostgreSQL character set :</b>{" "}
                      <span className="block pl-4">
                        ISO 8859-싱글 바이트 문자, EUC(확장 Unix 코드), UTF-8,
                        Mule 내부 코드와(멀티 바이트 character set)
                      </span>
                    </li>
                    <li>
                      <b>디폴트 character set :</b>{" "}
                      <span className="block pl-4">
                        PostgreSQL 데이터베이스 클러스터가 초기화되어질 때 결정.
                        데이터베이스를 생성할 때 오버라이드.각각 다른 character
                        set 를 가지는 다수의 데이터베이스를 가질 수 있습니다.
                      </span>
                    </li>
                    <li>
                      PostgreSQL 서버-클라이언트 character set 자동적으로 변환
                    </li>
                    <li>변환 정보는 pg_conversion 시스템 카탈로그에 저장.</li>
                    <li>
                      새로운 변환을 작성하려면 SQL 커멘드의 CREATE CONVERSION 를
                      사용
                    </li>
                    <li>LC_COLLATE 와 LC_CTYPE 설정 : initdb 시간에 결정</li>
                  </ul>
                  <br></br>
                  <p className="font-bold leading-7">
                    재실행하지 않는 한 변경할 수 없습니다.
                    <br></br>LC_MESSAGES 나 LC_MONETARY 등 다른 지역 설정은 서버
                    환경에 의해 처음으로 결정되지만 변경 가능
                  </p>
                  <p className="p-4 text-pink-700">
                    char *pg_encoding_to_char(int encoding_id)<br></br>
                    int PQclientEncoding(const PGconn * conn );<br></br>
                    SET CLIENT_ENCODING TO ' · value
                  </p>
                </div>
              </details>

              {/* XML 관련 함수 */}
              <details className="mb-4 bg-gray-200 rounded-md">
                <summary className="font-bold leading-7 bg-indigo-300 rounded-md px-4 py-2">
                  XML 관련 함수
                </summary>

                <div className="pl-8 px-4 pt-2">
                  <ul className="ml-5 leading-7">
                    <li>EXTRACT(XML)</li>
                    <li>INCERTXMLBEFORE</li>
                    <li>EXISTNODE</li>
                    <li>INCERTCHILDXML</li>
                    <li>APPENDCHILDXML </li>
                    <li>EXTRACTVALUE</li>
                    <li>DELETEXML</li>
                  </ul>
                  <br></br>
                  <ol className="ml-5 leading-7">
                    <li>
                      Windows 10 검색 영역→PostgreSQL 데이터베이스 GUI PgAdmin을
                      시작합니다.{" "}
                    </li>
                    <li>
                      서버 데이터베이스 암호를 추가→왼쪽 "서버"
                      옵션→데이터베이스(예: Postgres)를 확장합니다.
                    </li>
                    <li>
                      특정 데이터베이스에 대한 쿼리 도구 아이콘을 실행 "XPath"
                      기능을 사용하려면 XML 데이터를 저장할 XML 유형 열이 포함된
                      테이블이 있어야 합니다.
                    </li>
                    <li>
                      {" "}
                      CREATE TABLE postgresql 명령을 사용하여 새 테이블을 생성.
                      "ID" 열은 정수 유형이고 "정보" 열은 XML 데이터를 저장하기
                      위한 "XML" 유형입니다. PgAdmin "실행" 버튼을 사용하여 이
                      쿼리를 실행합니다.
                    </li>
                    <li>
                      쿼리에서 XPath() 함수를 사용하여 XML 데이터를 가져오기
                      위해 데이터베이스의 SELECT 명령어 내에서 XPath 기능을
                      활용해야 합니다. XPath() 함수는 일반적으로 세 개의 인수를
                      취합니다.
                      <ol className="ml-5 leading-7">
                        <li>
                          첫 번째 인수 : XML 데이터의 노드 집합/태그에 대해
                          알려주는 XPath 표현식=경로{" "}
                        </li>
                        <li>
                          두 번째 인수는 XML 데이터가 있는 실제 데이터 또는 XML
                          열
                        </li>
                      </ol>
                    </li>
                  </ol>
                </div>
              </details>

              {/* XMLQUERY */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">XMLQUERY</summary>

                <div className="pl-4">
                  <ul className="ml-5 leading-7">

                    {" "}
                    <span className="p-4 text-pink-700">
                      XPATH(xpath, xml [, nsarray])
                    </span>
                    <span>로 대체합니다.</span>


                  </ul>
                </div>
              </details>

              {/* XMLSERIALIZE */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  XMLSERIALIZE
                </summary>

                <div className="pl-4">
                  <p>
                    PostgreSQL에서는 XMLSERIALIZE함수를 사용하여 단순히 값을 캐스팅하는 것이 가능합니다.
                    <br></br><br></br> XMLPARSE 및 XMLSERIALIZE를 사용하지 않고 문자열
                    값과 xml 사이를 캐스트하면 DOCUMENT인지 또는
                    CONTENT인가 하는 선택이 "XML 옵션" 세션 구성 매개 변수에
                    의해 결정됩니다.
                  </p>
                  <p className="p-4 text-pink-700">
                    SELECT xmlserialize (DOCUMENT (<br></br>
                    SELECT xmlroot(xmlelement(name root, xmlelement(name value, 'test') ),
                    version '1.0', standalone yes) ) AS text);
                  </p>
                </div>
              </details>

              {/* UPDATEXML */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">UPDATEXML</summary>

                <div className="pl-4">
                  <p>다음 방법으로 xml을 수정할 수 있습니다.</p>
                  <p className="p-4 text-pink-700">
                    UPDATE xdata SET xmlcode='
                    &lt;values&gt;Infosys-Bangalore&lt;/values&gt; '<br></br>
                    WHERE cast(xpath('//values/text()',xmlcode) AS text[]) = '
                    Infosys';
                  </p>
                  <ul className="ml-5 leading-7">
                    <p className="font-bold leading-7">
                      쿼리 실행을 위한 스키마 설정
                    </p>
                  </ul>
                  <p className="p-4 text-pink-700">
                    CREATE TABLE xdata( id INT, xmlcode XML);<br></br>
                    INSERT INTO xdata VALUES
                    (1,'&lt;values&gt;Infosys&lt;values&gt;');
                    <br></br>
                    INSERT INTO xdata VALUES
                    (2,'&lt;values&gt;Enterprisedb&lt;values&gt; ');<br></br>
                    INSERT INTO xdata VALUES
                    (3,'&lt;values&gt;Wipro&lt;values&gt;');
                  </p>
                </div>
              </details>

              {/* TO_NCHAR(datetime), TO_NCHAR(character) */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  TO_NCHAR(datetime), TO_NCHAR(character)
                </summary>

                <div className="pl-4">
                  <p>
                    Postgresql의 data type에서는 Oracle의 nchar를 지원하지
                    않습니다.<br></br><br></br> nchar에 대응하는 postgresql 의 data
                    type에는 text, char, varchar가 있으며 ::data_type 으로
                    변환이 가능합니다. 변환시에는 함수의 parameter의 데이터타입이
                    character 인지 datetime인지 number 인지 알 수 없기 때문에
                    사용자가 매뉴얼하게 변환을 해주어야 합니다.
                  </p>
                </div>
              </details>

              {/* TO_MULTI_BYTE */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  TO_MULTI_BYTE
                </summary>

                <div className="pl-4">
                  <p>
                    postgresql에서는 지원하지 않는 함수입니다. Oracle 의 to_multi_byte
                    함수는
                    <b className="font-bold ">
                      database의 characterset이 함수의 parameter의 single byte
                      character 와 multi byte character 를 모두 가지고 있을 때
                      정상적으로 작동합니다.
                    </b>
                  </p>
                  <p>
                    (single byte character를 multi byte character로 변환하는
                    함수이기 때문에)<br></br><br></br>
                    postgresql에서 비슷한 기능을 하는 함수는 없지만 convert_to
                    함수나 octet_length 함수를 사용해서 single byte character
                    인지 multi byte character 인지 확인은 가능합니다.
                  </p>
                </div>
              </details>

              {/* TO_BINARY_FLOAT, TO_BINARY_DOUBLE */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  TO_BINARY_FLOAT, TO_BINARY_DOUBLE
                </summary>

                <div className="pl-4">
                  <p>
                    Postgresql은 binary_float 데이터형을 지원하지 않지만 numeric,
                    float4, float8, char, varchar, text 로 대체 가능합니다.
                  </p>
                </div>
              </details>

              {/* REGEXP_SUBSTR / REGEXP_INSTR */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  REGEXP_SUBSTR / REGEXP_INSTR
                </summary>

                <div className="pl-4">
                  <p>
                    POSTGRESQL 15에서부터 지원합니다.
                  </p>
                </div>
              </details>

              {/* NVL2 */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">NVL2</summary>

                <div className="pl-4">
                  <p>
                    NVL과 유사하게 coalesce로 변환하면 비슷한 결괏값을 얻을수 있습니다.
                  </p>
                </div>
              </details>

              {/* NEW_TIME */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">NEW_TIME</summary>

                <div className="pl-4">
                  <b>NEW_TIME : ORACLE의 서버 시간대를 변경할 때 사용하는 함수입니다.</b>
                  <p className="p-4 text-pink-700">
                    POSTGRES : ALTER DATABASE 데이터베이스명 SET timezone =
                    'Asia/Seoul';
                  </p>
                  <p>
                    위 쿼리문은 postgres 서버의 시간대를 변경할 때 사용히며 <br></br>
                    postgresql.conf 에 쿼리 입력 후 재시작하면 됩니다.
                  </p>
                </div>
              </details>

              {/* TRUNC (date) */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  TRUNC (date)
                </summary>

                <div className="pl-4">
                  <b> date_trunc(Date field, sourcetime_zone)로 변환</b>
                  <p>
                    date_trunc함수는 첫번째 인자로
                    [year,month,day,hour,minute,second,millisecond] 와 같이 날짜
                    키워드가 옵니다. 뒤의 인자는 timestamp 데이터가 옵니다.{" "}
                  </p>
                  <p className="p-4 text-pink-700">
                    SELECT date_trunc('DAY',TIMESTAMP'2022-11-16 14:41:20');
                    <br></br>
                    SELECT date_trunc('MONTH',TIMESTAMP'2022-11-16 14:41:20');
                    <br></br>
                    SELECT date_trunc('YEAR',TIMESTAMP'2022-11-16 14:41:20');
                  </p>
                  <br></br>
                  <b>결과 값</b>
                  <p className="p-4 text-pink-700">
                    2022-11-16 00:00:00.000<br></br>
                    2022-11-01 00:00:00.000<br></br>
                    2022-01-01 00:00:00.000
                  </p>
                  <p>
                    이 모든 값은 타임스탬프/날짜 필드를 전체 값으로
                    반올림합니다.<br></br><br></br>연도가 date_trunc 함수를 통해 전달되면
                    연도 다음에 오는 모든 타임스탬프 값은 초기 값으로
                    반올림됩니다.<br></br><br></br>
                    예를 들어, 월과 일의 값은 01이 됩니다(월과 일은 01부터
                    시작). 그러나 시, 분, 초 값은 00이 됩니다.
                  </p>
                </div>
              </details>

              {/* DBTIMEZONE */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  DBTIMEZONE
                </summary>
                <ul className="ml-5 leading-7">
                  <li>
                    current_setting : POSTGRES 9.5 버전부터 작동하며 시스템
                    어드민이 사용하는 함수로 데이터베이스 설정값을 출력합니다.
                    <br></br><br></br>서버의 시간대를 변경하거나 조회할 때 사용하므로 DBTIMEZONE을 대체할 수 있습니다.
                  </li>
                </ul>
                <div className="pl-4">
                  <p className="p-4 text-pink-700">
                    SELECT CURRENT_SETTING('TIMEZONE');
                  </p>
                </div>
              </details>

              {/* <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">COMPOSE</summary>

                <div className="pl-4">
                  <p></p>
                  <p className="p-4 text-pink-700">
                    select ascii('o'); --111 'o'의 아스키코드<br></br>
                    select to_hex(ascii('o')); -- 111을 16진수로 바꾼 것 = 6f
                    <br></br>
                    select ascii(UNISTR('\0308'));<br></br>
                    select ascii('ö'); --246 'ö'의 아스키코드<br></br>
                    select to_hex(ascii('ö')); -- 246을 16진수로 바꾸면 f6
                  </p>
                </div>
              </details> */}

            </div>

            {/* 오른쪽 토글 */}
            <div className="w-full lg:w-1/2 px-4 py-2">

              {/* ROUND (date) */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  ROUND (date)
                </summary>

                <div className="pl-4">
                  <p>PostgreSQL에 완벽히 대응하는 함수는 없지만 SUBSTR(time,n,n) 함수를 이용해 비슷하게 구현할 수 있습니다.</p>
                  <p className="p-4 text-pink-700">
                    select substr(sysdate,1,10) as dt from dual;
                  </p>
                  <p>
                    {" "}
                    위의 예문으로 예를 들어 yyyy-mm-dd 만 출력하기 위해서는 1번째 문자열 부터 시작해서
                    총 10개의 문자열을 가져오면 됩니다.
                  </p>
                  <p className="p-4 text-pink-700">
                    SELECT case <br></br>when substr(time,15,2){"<"}'10' then
                    concat(substr(time,12,2),':00')
                    <br></br>
                    <span>
                      when substr(time,15,2) {">"}='10' and substr(time,15,2)
                      {"<"}'20' then concat(substr(time,12,2),':10'
                    </span>
                  </p>
                  {/* <p className="font-bold leading-7">
                    case when 조건 절에서 우선 분 단위 값만 추출 해서 10분
                    단위로 구분짓고 여기에 해당 value의 hh 값을 가져와 쪼갤
                    분단위를 붙여주는 작업
                  </p> */}
                  <ul className="ml-5 leading-7">
                    <li>의미 : substr(time,15,2) = 분 mm만 추출</li>
                    <li>의미 : substr(time,12,2) = 시간 hh 만 추출</li>
                  </ul>
                </div>
              </details>

              {/* LEAST / GREATEST */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  LEAST / GREATEST
                </summary>

                <div className="pl-4">
                  <p>
                    ORACLE의 LESAT와 GREATEST 함수는 NULL값이 있을 시 NULL값을
                    반환하지만, PostgreSQL은 NULL값을 무시합니다.
                  </p>
                </div>
              </details>

              {/* LPAD / RPAD */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  LPAD / RPAD
                </summary>

                <div className="pl-4">
                  <p>
                    ORACLE에서는 한글을 2byte, PostgreSQL에서는 1byte로 계산하여
                    결과 값이 다르게 출력될 수 있습니다.
                  </p>
                </div>
              </details>

              {/* FIRST / LAST */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  FIRST / LAST
                </summary>

                <div className="pl-4">
                  <p>
                    postgres에서는 first,last 함수를 제공하지 않아 프로시저
                    함수를 추가해야만 동일한 기능을 사용할 수 있습니다.
                  </p>
                </div>
              </details>

              {/* CAST */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">CAST</summary>

                <div className="pl-4">
                  <p>
                    CAST 함수를 MULTISET과 함께 사용하는 경우가 있습니다.
                    <br></br>
                    PostgreSQL은 MULTISET 기능을 지원하지 않기 때문에<br></br>
                    사용자가 직접 MULTISET 내부 행을 분리하여 각각의 형변환을
                    해야 합니다.
                  </p>
                </div>
              </details>

              {/* ASCIISTR */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">ASCIISTR</summary>

                <div className="pl-4">
                  <p>
                    ASCII 이외의 문자는 아래와 같은 방법으로 \xxxx형태로 표현할
                    수 있습니다.
                  </p>
                  <p className="p-4 text-pink-700">
                    concat('\',lpad(to_hex(ascii('Ä')),4,'0'))
                  </p>
                </div>
              </details>

              {/* CONVERT */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">CONVERT</summary>

                <div className="pl-4">
                  <ul className="ml-5 leading-7">
                    <li>
                      <a
                        href="https://docs.oracle.com/cd/B28359_01/server.111/b28286/functions027.htm#SQLRF00620"
                        target="blank"
                      >
                        {" "}
                        ORACLE 지원 문자셋
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.postgresql.org/docs/current/multibyte.html"
                        target="blank"
                      >
                        PostgreSQL 지원 문자셋
                      </a>
                    </li>
                  </ul>
                </div>
              </details>

              {/* TO_LOB */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">TO_LOB</summary>

                <div className="pl-4">
                  <p>
                    Postgresql은 Oracle의 LONG, LONG RAW data type을 지원하지
                    않습니다.<br></br><br></br>비슷한 data type으로는 long(charater data)
                    는 text(단 text는 1gb limit , long은 2gb limit) , long
                    raw(binary data) 는 bytea로 대체하는 것이 적절합니다.
                  </p>
                </div>
              </details>

              {/* SYS_GUID */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">SYS_GUID</summary>

                <div className="pl-4">
                  <p>
                    ORACLE의 SYS_GUID 함수는 16바이트로 구성된 전역 고유식별자를
                    생성해줍니다.<br></br>이와 유사한 기능을 하는 POSTGRES의
                    UUID_GENERATE_V1함수도 UUID를 생성합니다.{" "}
                  </p>
                </div>
              </details>

              {/* TO_CHAR(NUMBER),TO_NCHAR(NUMBER) */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  TO_CHAR(NUMBER),TO_NCHAR(NUMBER)
                </summary>

                <div className="pl-4">
                  <li><b>TO_NCHAR(NUMBER)</b></li>
                  <p>
                    NCHAR : 고정폭 문자열(1-2바이트)<br></br>
                    TO_NCHAR(NUMBER) : 숫자 형식 데이터를 nchar형태의 데이터로
                    변환.
                  </p>
                  <br></br>
                  <p>
                    POSTGRES에는 nchar type을 지원하지 않아 ORACLE의 TO_NCHAR와
                    같은 기능 을 하는 함수는 없음.<br></br>nchar type이 1-2
                    바이트 고정폭 문자열이므로 비슷하게 postgres에서는 문자열의
                    바이트 수를 구하는 아래 함수를 사용 가능할 것도 같음
                  </p>
                  <p className="p-4 text-pink-700">select octet_length(’a’)</p>
                  <br></br>
                  <li><b>TO_CHAR(NUMBER)</b></li>
                  <p className="p-4 text-pink-700">
                    select to_char(1234, 'FM9999');
                  </p>
                  <p>
                    FM: 문자열의 공백제거<br></br>숫자의 최대 길이만큰 9999...
                    형식을 지정한다.<br></br>(9 : 값이 없으면 표시안함, 0: 값이
                    없으면 "0"으로 처리)<br></br>정수는 지정한 형식보다 값의
                    길이가 길면 오류, 소수 지정한 길이보다 길면 반올림
                  </p>
                </div>
              </details>

              {/* UID */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">UID</summary>

                <div className="pl-4">
                  <p>
                    PostgreSQL의 PG_BACKEND_PID()함수가 UID와 비슷한 역할을 하여 현재 로그인한 유저의 process id를 반환해줍니다.{" "}
                  </p>
                </div>
              </details>

              {/* TZ_OFFSET */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">TZ_OFFSET</summary>

                <div className="pl-4">
                  <p>본 사이트의 TZ_OFFSET 변환은 예문</p>
                  <p className="p-4 text-pink-700">‘SELECT TZ_OFFSET('US/Eastern') FROM DUAL;’</p>
                  <p>을 기준으로 작성되어 있습니다. 여러 행을 SELECT하여 에러가 발생할 경우 다른 행들을 구문의 적절한 위치로 옮겨주어야 합니다.{" "}
                  </p>
                </div>
              </details>

              {/* TIMESTAMP / TZ */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  TIMESTAMP / TZ
                </summary>

                <div className="pl-4">
                  <p>PostgreSQL에서는 timezone을 3가지 방법으로 표시 할 수 있다. <a className="font-bold text-indigo-500" href="https://www.postgresql.org/docs/current/datatype-datetime.html#DATATYPE-TIMEZONES">(관련 문서)</a> </p>
                  <br></br><p>POSIX-Style의 Timezone 표기법인 STDoffset, STDoffeset DST 형태의 경우 POSIX-Style에서 UTC로부터 서쪽으로 시간상 얼마나 떨어져 잇는지를 계산한다. 따라서 AT TIME ZONE 'UTC+9'의 경우, 대한민국은 그리니치 천문대 기준으로 대칭적 위치의 시간대에 해당하여 값에 오차가 생긴다.</p>
                  <p>오차를 없애기 위해서는 UTC 시간의 부호를 바꾸어주거나, AT TIME ZONE 'Asia/Seoul'을 입력해주면 된다.</p>
                </div>
              </details>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Functions;
