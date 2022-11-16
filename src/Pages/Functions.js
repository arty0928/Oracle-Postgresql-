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
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  TO_NCHAR(datetime), TO_NCHAR(character)
                </summary>

                <div className="pl-4">
                  <p>
                    Postgresql의 data type에서는 Oracle의 nchar를 지원하지
                    않는다.<br></br> nchar에 대응하는 postgresql 의 data
                    type에는 text, char, varchar가 있으며 ::data_type 으로
                    변환이 가능하다. 변환시에는 함수의 parameter의 데이터타입이
                    character 인지 datetime인지 number 인지 알 수 없기 때문에
                    사용자가 매뉴얼하게 변환을 해주어야 한다.
                  </p>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  TO_MULTI_BYTE
                </summary>

                <div className="pl-4">
                  <p>
                    postgresql에서는 지원하지 않는 함수. Oracle 의 to_multi_byte
                    함수는
                  </p>
                  <p className="font-bold leading-7">
                    database의 characterset이 함수의 parameter의 single byte
                    character 와 multi byte character 를 모두 가지고 있을 때
                    정상적으로 작동함.
                  </p>
                  <p>
                    (single byte character를 multi byte character로 변환하는
                    함수이기 때문에)<br></br>
                    postgresql에서 비슷한 기능을 하는 함수는 없지만 convert_to
                    함수나 octet_length 함수를 사용해서 single byte character
                    인지 multi byte character 인지 확인은 가능합니다.
                  </p>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  TO_BINARY_FLOAT, TO_BINARY_DOUBLE
                </summary>

                <div className="pl-4">
                  <p>
                    Postgresql은 binary_float 데이터형을 지원하지 않음.numeric,
                    float4, float8, char, varchar, text 로 대체 가능함.
                  </p>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  REGEXP_SUBSTR
                </summary>

                <div className="pl-4">
                  <p>
                    REGEXP_SUBSTR : 특정 패턴을 찾아 자르는 함수<br></br>
                    POSTGRESQL 15에서부터 지원
                  </p>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">NVL2</summary>

                <div className="pl-4">
                  <p>
                    NVL2 : NULL이 아닌 경우 지정값1 , NULL인 경우 지정값2 출력
                    <br></br>
                    NVL을 coalesce 로 변환하므로 사용하면 비슷한 결괏값을 얻을
                    수 있음
                  </p>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  REGEXP_INSTR
                </summary>

                <div className="pl-4">
                  <p>
                    정규 표현 패턴에 대한 문자열 검색<br></br>
                    POSTGRESQL 15에서부터 지원
                  </p>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">NEW_TIME</summary>

                <div className="pl-4">
                  <p>postgresql.conf 에 아래 쿼리 입력 후 재시작</p>
                  <p className="p-4 text-pink-700">
                    ALTER DATABASE 데이터베이스명 SET timezone = 'Asia/Seoul';
                  </p>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  TRUNC (date)
                </summary>

                <div className="pl-4">
                  <p className="p-4 text-pink-700">
                    date_trunc(field, sourcetime_zone ])
                  </p>
                  <p className="p-4 text-pink-700">
                    WITH TEMP AS ( SELECT to_timestamp('2018-12-13 22:10:59',
                    <br></br>
                    'YYYY-MM-DD HH24:MI:SS') DT , 1234.56 NMB ) SELECT
                    DT::timestamp <br></br>, date_trunc('day', DT)::timestamp ,
                    NMB , TRUNC(NMB) FROM temp
                  </p>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  DBTIMEZONE
                </summary>

                <div className="pl-4">
                  <p className="p-4 text-pink-700">
                    SELECT CURRENT_SETTING('TIMEZONE');
                  </p>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">COMPOSE</summary>

                <div className="pl-4">
                  <p className="p-4 text-pink-700">
                    select ascii('o'); --111 'o'의 아스키코드<br></br>
                    select to_hex(ascii('o')); -- 111을 16진수로 바꾼 것 = 6f
                    <br></br>
                    select ascii(UNISTR('\0308'));<br></br>
                    select ascii('ö'); --246 'ö'의 아스키코드<br></br>
                    select to_hex(ascii('ö')); -- 246을 16진수로 바꾸면 f6
                  </p>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  ROUND (date)
                </summary>

                <div className="pl-4">
                  <p className="p-4 text-pink-700">
                    select substr(time,1,10) as dt from
                  </p>
                  <p>
                    {" "}
                    일자별 추출을 위해서 가져온 값으로 time의 표현식을 확인
                    <br></br>
                    yyyy-mm-dd 만 가져오기 위해서는 1번째 문자열 부터 시작해서
                    총 10개의 문자열을 가져오면 된다.
                  </p>
                  <p className="p-4 text-pink-700">
                    SELECT
                    <span>
                      case when substr(time,15,2){"<"}'10' then
                      concat(substr(time,12,2),':00')
                    </span>
                    <span>
                      when substr(time,15,2) {">"}='10' and substr(time,15,2)
                      {"<"}'20' then concat(substr(time,12,2),':10'
                    </span>
                  </p>
                  <p className="font-bold leading-7">
                    case when 조건 절에서 우선 분 단위 값만 추출 해서 10분
                    단위로 구분짓고 여기에 해당 value의 hh 값을 가져와 쪼갤
                    분단위를 붙여주는 작업
                  </p>
                  <ul className="ml-5 leading-7">
                    <li>의미 : substr(time,15,2) = 분 mm만 추출</li>
                    <li>의미 : substr(time,12,2) = 시간 hh 만 추출</li>
                  </ul>
                </div>
              </details>
            </div>

            {/* 오른쪽 토글 */}
            <div className="w-full lg:w-1/2 px-4 py-2">
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  FIRST/LAST
                </summary>

                <div className="pl-4">
                  <p>
                    postgres에서는 first,last 함수를 제공하지 않아 프로시저
                    함수를 추가해야만 동일한 기능 사용 가능
                  </p>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">NEXT_DAY</summary>

                <div className="pl-4">
                  <ul className="ml-5 leading-7">
                    <li>
                      <p className="p-4 text-pink-700">
                        SELECT 'TOMORROW'::date + ( 4 + 7 - extract ( dow FROM
                        'TOMORROW'::date))::int%7;
                      </p>
                    </li>
                    <li>
                      <p className="p-4 text-pink-700">
                        SELECT (date_trunc('MONTH', ('20130312')::timestamp) +
                        INTERVAL '1 MONTH - 1 day')::timestamp
                      </p>
                    </li>
                  </ul>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  XML 관련 함수
                </summary>

                <div className="pl-4">
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
                      시작{" "}
                    </li>
                    <li>
                      서버 데이터베이스 암호를 추가→왼쪽 "서버"
                      옵션→데이터베이스(예: Postgres)를 확장
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
                      쿼리를 실행
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
                          열.
                        </li>
                      </ol>
                    </li>
                  </ol>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  NLS 관련 함수
                </summary>

                <div className="pl-4">
                  <p>postgresql.conf 설정 파일</p>
                  <p className="font-bold leading-7">
                    {" "}
                    유저 선택 언어로 메세지가 번역되려면 NLS 사용<br></br>
                    다른 지역 지원 기능과는 독립
                  </p>
                  <ul className="ml-5 leading-7">
                    <li>
                      - initdb --locale : 다른 지역(locale)을 사용하고 싶은 경우
                      <br></br>
                      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;시스템의
                      로케일 설정이 불분명한 경우
                    </li>
                    <li>
                      locale -a : 지역 지원 기능이 정상적으로 동작하지 않는 경우
                      <br></br>&emsp;&emsp;&emsp;&emsp;&ensp;operating system 이
                      제공하는 경우에 커멘드를 사용
                    </li>
                    <li>
                      PostgreSQL JDBC : MULE_INTERNAL,LATIN6,LATIN8, LATIN10 를
                      지원하지 않음
                    </li>
                    <li>
                      PostgreSQL character set : ISO 8859-싱글 바이트 문자
                      <br></br>
                      EUC(확장 Unix 코드), UTF-8, Mule 내부 코드와(멀티 바이트
                      character set)
                    </li>
                    <li>
                      디폴트 character set : PostgreSQL 데이터베이스 클러스터가
                      초기화되어질 때 결정.
                      <br></br>데이터베이스를 생성할 때 오버라이드.각각 다른
                      character set 를 가지는 다수의 데이터베이스를 가질 수
                      있습니다.
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

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">CONVERT</summary>

                <div className="pl-4">
                  <ul className="ml-5 leading-7">
                    <li>
                      {" "}
                      ORACLE 지원 문자셋
                      <a
                        href="https://docs.oracle.com/cd/B28359_01/server.111/b28286/functions027.htm#SQLRF00620"
                        target="blank"
                      ></a>
                    </li>
                    <li>
                      {" "}
                      PostgreSQL 지원 문자셋
                      <a
                        href="https://www.postgresql.org/docs/current/multibyte.html"
                        target="blank"
                      ></a>
                    </li>
                  </ul>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">XMLQUERY</summary>

                <div className="pl-4">
                  <ul className="ml-5 leading-7">
                    <li>
                      {" "}
                      <p className="p-4 text-pink-700">
                        XPATH(xpath, xml [, nsarray])
                      </p>{" "}
                    </li>
                    <li>
                      {" "}
                      <p className="p-4 text-pink-700">
                        SELECT XPATH('//employees/employee/name', xmldata) FROM
                        Employees;
                      </p>
                    </li>
                  </ul>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">UPDATEXML</summary>

                <div className="pl-4">
                  <p className="p-4 text-pink-700">
                    UPDATE xdata SET xmlcode=' &lt;values&gt;Infosys-Bangalore&lt;/values&gt;
                    '<br></br>
                    WHERE cast(xpath('//values/text()',xmlcode) AS text[]) = '
                    Infosys';
                  </p>
                  <ul className="ml-5 leading-7">
                    <li>
                      <p className="font-bold leading-7">
                        쿼리 실행하기 전에 스키마 DB에 미리 테이블이랑 값을
                        넣어둔 것( 쿼리가 가져와서 쓸 수 있게 한 것)
                      </p>
                    </li>
                  </ul>
                  <p className="p-4 text-pink-700">
                    CREATE TABLE xdata( id INT, xmlcode XML);<br></br>
                    INSERT INTO xdata VALUES (1,'&lt;values&gt;Infosys&lt;values&gt;');
                    <br></br>
                    INSERT INTO xdata VALUES (2,'&lt;values&gt;Enterprisedb&lt;values&gt;
                    ');<br></br>
                    INSERT INTO xdata VALUES (3,'&lt;values&gt;Wipro&lt;values&gt;');
                  </p>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  XMLSERIALIZE
                </summary>

                <div className="pl-4">
                  <p className="font-bold leading-7">
                    xml에서 문자열 값을 생성하는 반대의 작업은 xmlserialize
                    함수를 사용
                  </p>
                  <p className="p-4 text-pink-700">
                    XMLSERIALIZE ( [ DOCUMENT | CONTENT ]<br></br>
                    *value* AS *type* )<br></br>
                  </p>
                  <p>
                    PostgreSQL에서는 단순히 값을 캐스팅하는 것이 가능합니다.
                    <br></br> XMLPARSE 및 XMLSERIALIZE를 사용하지 않고 문자열
                    값과 xml 사이를 <br></br>캐스트하면 DOCUMENT인지 또는
                    CONTENT인가 하는 선택이 "XML 옵션" 세션 구성 매개 변수에
                    의해 결정됩니다.
                  </p>
                  <p className="p-4 text-pink-700">
                    SELECT xmlserialize (DOCUMENT (<br></br>
                    SELECT xmlroot(<br></br>
                    xmlelement(name root, xmlelement(name value, 'test') ),
                    <br></br>
                    version '1.0', standalone yes) ) AS text);
                  </p>
                </div>
              </details>

              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">TO_LOB</summary>

                <div className="pl-4">
                  <p>
                    Postgresql은 Oracle의 LONG, LONG RAW data type을 지원하지
                    않습니다.<br></br>비슷한 data type으로는 long(charater data)
                    는 text(단 text는 1gb limit , long은 2gb limit) , long
                    raw(binary data) 는 bytea로 변환이 가능할 것으로 보입니다
                  </p>
                </div>
              </details>
            </div>
            <p
              className="mt-3 text-center sm:text-2xl sm:font-bold tracking-tight text-gray-900
                         text-3xl font-bold text-center title-font text-gray-900 mb-4"
            >
              Functions currently under consideration
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Functions;
