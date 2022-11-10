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



                        <h1 className="mt-6 text-center sm:text-4xl sm:font-bold tracking-tight text-gray-900
                         text-3xl font-bold text-center title-font text-gray-900 mb-4">
                            Frequently Asked Question
                        </h1>
                        <p className="
                        text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                            The most common questions about how our business works and what
                            can do for you.
                            <br></br>
                            <button onClick=
                                {() => {
                                    navigate("/Oracle-Postgresql-");
                                }
                                } className="
                                mt-6 text-center text-xl font-bold tracking-tight text-indigo-600 mr-6">
                                Back to Query Converter
                            </button>
                            <button onClick=
                                {() => {
                                    navigate("/Functions");
                                }
                                } className="
                                mt-6 text-center text-xl font-bold tracking-tight text-indigo-600">
                                Functions
                            </button>

                        </p>
                    </div>
                    <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                        <div className="w-full lg:w-1/2 px-4 py-2">
                            <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                                <summary class="font-semibold leading-7">
                                    치환
                                </summary>

                                <div className="pl-4">
                                    <p className="font-bold leading-7">— 데이터 타입</p>
                                    <p>Oracle은 독자적인 데이터 타입을 사용합니다. 따라서 데이터 타입 관련된 함수나 쿼리 변환 시 주의할 필요가 있습니다.</p>
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

                            <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                                <summary className="font-semibold leading-7">
                                    이름에 대문자가 포함될 때 "이름"
                                </summary>

                                <div className="pl-4">
                                    <p>ORACLE과 달리 PostgreSQL은 모든 이름을 소문자로 인식하기 때문에 대문자가 포함되는 이름은 쌍따옴표(””)로 감싸주어야 합니다. 만약 column이름에 대문자가 포함되어 있다면 “column이름”과 같이 표현해 주어야 하고, table이름의 경우도 마찬가지입니다. </p>
                                    <p className="p-4 text-pink-700"> ex) select “Name” from “Sampletable”; </p>
                                </div>
                            </details>


                            <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                                <summary className="font-semibold leading-7">
                                    외부 조인(OUTER JOIN)
                                </summary>

                                <div className="pl-4">
                                    <p>PostgreSQL은 (+)로 조인할 대상 테이블을 나타내는 기능을 지원하지 않습니다. 따라서 아래와 같이 표현된 ORACLE 외부조인 구문이 있다면,</p>
                                    <p className="p-4 text-pink-700"> SELECT test.a, testjoin.c <br></br>
                                        FROM test, testjoin<br></br>
                                        WHERE test.b = testjoin.b(+);
                                    </p>
                                    <p>PostgreSQL에서는 다음과 같이 작성해 주어야 합니다.</p>
                                    <p className="p-4 text-pink-700"> SELECT test.a, testjoin.c <br></br>
                                        FROM test <br></br>
                                        LEFT OUTER JOIN testjoin <br></br>
                                        ON test.b = testjoin.b;
                                    </p>
                                </div>
                            </details>

                            <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                                <summary className="font-semibold leading-7">
                                    CONNECT BY
                                </summary>

                                <div className="pl-4">
                                    <p>PostgreSQL은 CONNECT BY 구문을 지원하지 않습니다. 대신 WITH RECURSIVE 구문을 사용하여 PostgreSQL에서도 계층형 쿼리를 구현할 수 있습니다. 때로는 generate_series 함수가 CONNECT BY의 기능을 대체하기도 합니다.</p>
                                </div>
                            </details>

                        </div>



                        <div className="w-full lg:w-1/2 px-4 py-2">

                            <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                                <summary className="font-semibold leading-7">
                                    ALTER TRIGGER ENABLE/DISABLE
                                </summary>

                                <div className="pl-4">
                                    <p>ORACLE에서는 트리거의 이름만으로 ENABLE 혹은 DISABLE 설정할 수 있으나, PostgreSQL에서는 해당하는 테이블을 선정해 주어야 합니다. </p>
                                    <p className="p-4 text-pink-700">ex) <br></br>
                                        <span className="font-semibold">ORACLE:</span> ALTER TRIGGER triggername DISABLE;<br></br>
                                        <span className="font-semibold">PostgreSQL:</span> ALTER TABLE tablename DISABLE TRIGGER triggername;
                                    </p>
                                </div>
                            </details>

                            <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                                <summary className="font-semibold leading-7">
                                    How Long is this site live?
                                </summary>

                                <div className="pl-4">
                                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                                    minim velit nostrud pariatur culpa magna in aute.
                                </div>
                            </details>


                            <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                                <summary className="font-semibold leading-7">
                                    How Long is this site live?
                                </summary>

                                <div className="pl-4">
                                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                                    minim velit nostrud pariatur culpa magna in aute.
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
