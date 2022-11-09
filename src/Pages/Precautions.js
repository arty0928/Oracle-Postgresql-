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
                                    navigate("/");
                                }
                                } className="
                                mt-6 text-center text-xl font-bold tracking-tight text-indigo-600">
                                Back to Query Converter
                            </button>

                        </p>
                    </div>
                    <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                        <div className="w-full lg:w-1/2 px-4 py-2">
                            <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                                <summary className="font-semibold">
                                    How Long is this site live?
                                </summary>

                                <span>
                                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                                    minim velit nostrud pariatur culpa magna in aute.
                                </span>
                            </details>

                            <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                                <summary className="font-semibold">
                                    How Long is this site live?
                                </summary>

                                <span>
                                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                                    minim velit nostrud pariatur culpa magna in aute.
                                </span>
                            </details>


                            <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                                <summary className="font-semibold">
                                    How Long is this site live?
                                </summary>

                                <span>
                                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                                    minim velit nostrud pariatur culpa magna in aute.
                                </span>
                            </details>


                        </div>

                        <div className="w-full lg:w-1/2 px-4 py-2">

                            <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                                <summary className="font-semibold">
                                    How Long is this site live?
                                </summary>

                                <span>
                                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                                    minim velit nostrud pariatur culpa magna in aute.
                                </span>
                            </details>

                            <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                                <summary className="font-semibold">
                                    How Long is this site live?
                                </summary>

                                <span>
                                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                                    minim velit nostrud pariatur culpa magna in aute.
                                </span>
                            </details>


                            <details className="mb-4 bg-gray-200 rounded-md py-2 px-4">
                                <summary className="font-semibold">
                                    How Long is this site live?
                                </summary>

                                <span>
                                    Laboris qui labore cillum culpa in sunt quis sint veniam.
                                    Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                                    minim velit nostrud pariatur culpa magna in aute.
                                </span>
                            </details>


                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Precautions;
