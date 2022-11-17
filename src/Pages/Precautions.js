import React from "react";
import { useNavigate } from "react-router-dom";
import "./Precautions.css";

function Precautions() {
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
              Frequently Asked Question
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
                  navigate("/Oracle-Postgresql-");
                }}
                className="
                                mt-6 text-center text-xl font-bold tracking-tight text-indigo-600 mr-10"
              >
                Back to Query Converter
              </button>

              <button
                onClick={() => {
                  navigate("/Functions");
                }}
                className="
                                mt-6 text-center text-xl font-bold tracking-tight text-indigo-600"
              >
                Functions
              </button>
            </p>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            <div className="w-full lg:w-1/2 px-4 py-2">
              {/* 치환 */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">치환</summary>

                <div className="pl-4">
                  <p className="font-bold leading-7">— 데이터 타입</p>
                  <p>
                    Oracle은 독자적인 데이터 타입을 사용합니다. 따라서 데이터
                    타입 관련된 함수나 쿼리 변환 시 주의할 필요가 있습니다.
                  </p>
                  <ul className="ml-5 leading-7">
                    <li>NUMBER ⇒ NUMERIC</li>
                    <li>BINARY_FLOAT⇒ REAL</li>
                    <li>BINARY_DOUBLE⇒ DOUBLE PRECISION</li>
                    <li>DATE ⇒ TIMESTAMP</li>
                    <li>TIMEZONE ⇒ TIMEZONE</li>
                    <li>CLOB ⇒ TEXT</li>
                    <li>BLOB ⇒ BYTEA</li>
                    <li>VARCHAR2 ⇒ VARCHAR</li>
                  </ul>
                  <br></br>
                  <p className="font-bold leading-7">— 테이블 스페이스</p>
                  <ul className="ml-5 leading-7">
                    <li>TABLESPACE USERS ⇒ TABLESPACE pg_default</li>
                  </ul>
                  <br></br>
                  <p className="font-bold leading-7">—연산자</p>
                  <ul className="ml-5 leading-7">
                    <li>MINUS ⇒ EXCEPT</li>
                  </ul>
                  <br></br>
                </div>
              </details>

              {/* 이름에 대문자가 포함될 때 "이름" */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  이름에 대문자가 포함될 때 "이름"
                </summary>

                <div className="pl-4">
                  <p>
                    ORACLE과 달리 PostgreSQL은 모든 이름을 소문자로 인식하기
                    때문에 대문자가 포함되는 이름은 쌍따옴표(””)로 감싸주어야
                    합니다. 만약 column이름에 대문자가 포함되어 있다면
                    “column이름”과 같이 표현해 주어야 하고, table이름의 경우도
                    마찬가지입니다.{" "}
                  </p>
                  <p className="p-4 text-pink-700">
                    {" "}
                    ex) select “Name” from “Sampletable”;{" "}
                  </p>
                </div>
              </details>

              {/* 외부 조인 (OUTER JOIN) */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  외부 조인(OUTER JOIN)
                </summary>

                <div className="pl-4">
                  <p>
                    PostgreSQL은 (+)로 조인할 대상 테이블을 나타내는 기능을
                    지원하지 않습니다. 따라서 아래와 같이 표현된 ORACLE 외부조인
                    구문이 있다면,
                  </p>
                  <p className="p-4 text-pink-700">
                    {" "}
                    SELECT test.a, testjoin.c <br></br>
                    FROM test, testjoin<br></br>
                    WHERE test.b = testjoin.b(+);
                  </p>
                  <p>PostgreSQL에서는 다음과 같이 작성해 주어야 합니다.</p>
                  <p className="p-4 text-pink-700">
                    {" "}
                    SELECT test.a, testjoin.c <br></br>
                    FROM test <br></br>
                    LEFT OUTER JOIN testjoin <br></br>
                    ON test.b = testjoin.b;
                  </p>
                </div>
              </details>

              {/* CONNECT BY */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  CONNECT BY
                </summary>

                <div className="pl-4">
                  <p>
                    PostgreSQL은 CONNECT BY 구문을 지원하지 않습니다. 대신 WITH
                    RECURSIVE 구문을 사용하여 PostgreSQL에서도 계층형 쿼리를
                    구현할 수 있습니다. 때로는 generate_series 함수가 CONNECT
                    BY의 기능을 대체하기도 합니다.
                  </p>
                </div>
              </details>

              {/* ALTER TRIGGER ENABLE/DISABLE */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  ALTER TRIGGER ENABLE/DISABLE
                </summary>

                <div className="pl-4">
                  <p>
                    ORACLE에서는 트리거의 이름만으로 ENABLE 혹은 DISABLE 설정할
                    수 있으나, PostgreSQL에서는 해당하는 테이블을 선정해 주어야
                    합니다.{" "}
                  </p>
                  <p className="p-4 text-pink-700">
                    ex) <br></br>
                    <b>ORACLE:</b> ALTER TRIGGER
                    triggername DISABLE;<br></br>
                    <b>PostgreSQL:</b> ALTER
                    TABLE tablename DISABLE TRIGGER triggername;
                  </p>
                </div>
              </details>

              {/* INCLUDING OVERFLOW 삭제 */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  INCLUDING OVERFLOW 삭제
                </summary>

                <div className="pl-4">
                  <p>
                    테이블을 정의하는 DDL 쿼리문에서 INCLUDING ~ OVERFLOW 구문을
                    삭제해야 합니다.
                  </p>
                  <p className="p-4 text-pink-700">
                    ex) <br></br>
                    <b>ORACLE:</b> CREATE TABLE test ( id NUMBER CONSTRAINT
                    test_pk_id PRIMARY KEY, name VARCHAR2(30))
                    ORGANIZATION INDEX NOCOMPRESS INCLUDING name OVERFLOW
                    TABLESPACE users;
                    <br></br>
                    <b>PostgreSQL:</b> CREATE TABLE test ( id NUMERIC CONSTRAINT
                    test_pk_id PRIMARY KEY, name VARCHAR(30));
                  </p>
                </div>
              </details>

              {/* LOB STORE 삭제 */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  LOB STORE 삭제
                </summary>

                <div className="pl-4">
                  <p>
                    PostgreSQL은 LOB 데이터 타입은 물론 LOB STORE 기능을
                    지원하지 않으므로 LOB STORE 구문이 포함되어 있다면 이를 모두
                    삭제해야 합니다.
                  </p>
                </div>
              </details>

              {/* END LABEL로 예약어가 사용될 때 “이름” */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  END LABEL로 예약어가 사용될 때 “이름”
                </summary>

                <div className="pl-4">
                  <p>PostgreSQL은 END LABEL로 예약어를 사용할 수 없기 때문에 만약 사용되었다면 쌍따옴표(“”)로 감싸 주어야 합니다.  </p>
                  <p className="p-4 text-pink-700"> ex) <br></br> CREATE OR REPLACE PACKAGE array is ~<br></br>END "array"; </p>
                </div>
              </details>


            </div>



            <div className="w-full lg:w-1/2 px-4 py-2">


              {/* END LABEL이 START LABEL과 다를 때 */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  END LABEL이 START LABEL과 다를 때
                </summary>

                <div className="pl-4">
                  <p>
                    PostgreSQL은 END LABEL과 START LABEL이 다를 때 오류가
                    발생합니다. 이 경우 END LABEL을 제거해 주어야 합니다.
                  </p>
                  <p className="p-4 text-pink-700 ">
                    ex) 아래와 같은 경우 오류 발생<br></br>
                    CREATE OR REPLACE PACKAGE startlabel is ~ <br></br>
                    END endlabel ;
                  </p>
                </div>
              </details>

              {/* GLOBAL TEMPORARY TABLE */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  GLOBAL TEMPORARY TABLE
                </summary>

                <div className="pl-4">
                  <p>
                    pgtt extension을 설치하면 PostgreSQL에서도 GLOBAL TEMPORARY
                    TABLE을 원활하게 사용할 수 있습니다. PostgreSQL에서
                    GLOBAL TEMPORARY TABLE을 사용할 때는 스키마 이름을 제거해야
                    합니다.
                  </p>
                </div>
              </details>

              {/* INDEX에 함수 또는 식이 포함된 경우 괄호 추가 */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  INDEX에 함수 또는 식이 포함된 경우 괄호 추가
                </summary>

                <div className="pl-4">
                  <p>
                    PostgreSQL에서는 INDEX에 함수 또는 식이 포함된 괄호를 한 번
                    더 괄호로 감싸주어야 합니다.
                  </p>
                  <p className="p-4 text-pink-700">
                    ex) CREATE INDEX indexname ON tablename ((meta-{">"}
                    {">"}’example’));
                  </p>
                </div>
              </details>

              {/* EXTERNAL TABLE 구문 → FOREIGN TABLE 구문 */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  EXTERNAL TABLE 구문 → FOREIGN TABLE 구문
                </summary>

                <div className="pl-4">
                  <p>
                    ORACLE의 EXTERNAL TABLE 기능을 PostgreSQL의 FOREIGN TABLE로
                    대체할 수 있습니다.
                  </p>
                </div>
              </details>

              {/* 중첩테이블(NESTED TABLE) */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  중첩테이블(NESTED TABLE)
                </summary>

                <div className="pl-4">
                  <p>
                    {" "}
                    ORACLE의 중첩테이블을 PostgreSQL에서도 배열을 이용하여
                    비슷하게 구현할 수는 있지만, 이를 중첩테이블이라 부르지는
                    않습니다.<br></br>또한 PostgreSQL은 이러한 테이블에서의 NOT
                    NULL 기능을 지원하지 않으므로 중첩테이블 구문에 NOT NULL이
                    포함되어 있다면 삭제해야 합니다.
                  </p>
                </div>
              </details>

              {/* ALTER 테이블명 MODIFY (컬럼명) → ALTER 테이블명 ALTER 컬럼명 */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  ALTER 테이블명 MODIFY (컬럼명) → ALTER 테이블명 ALTER 컬럼명
                </summary>

                <div className="pl-4">
                  <p>
                    PostgreSQL에서 컬럼을 수정할 때는 ‘ALTER 컬럼명’ 형식의
                    구문을 사용합니다.
                  </p>
                </div>
              </details>

              {/* GENERATED~IDENTITY 구문 */}
              <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                <summary className="font-semibold leading-7">
                  GENERATED~IDENTITY 구문
                </summary>

                <div className="pl-4">
                  <p className="font-bold leading-7">
                    PostgreSQL에서 GENERATED~IDENTITY 구문을 사용할 때 주의할
                    사항은 다음과 같습니다.
                  </p>
                  <ol className="ml-5 leading-7">
                    <li>INT 자료형 → BIGINT 자료형 변환</li>
                    <li>ORDER 또는 NOORDER 제거</li>
                  </ol>
                  <p>GENERATED_IDENTITY_CACHED에서 같이 처리합니다. </p>
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

export default Precautions;
