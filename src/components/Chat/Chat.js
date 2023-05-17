import React from "react";
import "./Chat.css";
import LeftMenu from "./LeftMenu/LeftMenu";

function Chat(props) {
    return (
        <main className="container shadow mt-4" id="chat-app">
            <div className="row">
                <LeftMenu {...props} />

                {/* Chat and Recipient  */}
                <div className="col-8 p-0">
                    <div className="card border-0">
                        {/* Recipient details */}
                        <div className="card-header d-flex align-items-center bg-light-gray rounded-0">
                            <div>
                                <img
                                    src="img/whale.jpeg"
                                    className="rounded-circle"
                                    alt="avatar"
                                />
                            </div>
                            <span className="w-100 ms-4">Yuval Grofman</span>
                        </div>
                        {/* Messages */}
                        <div className="card-body p-0">
                            <ul
                                className="list-unstyled overflow-auto m-0 pt-2"
                                id="chat"
                            >
                                <li className="d-flex justify-content-start">
                                    <div className="card rounded-4 max-width-60 mx-3 my-2 bg-light-gray">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet consectetur
                                            adipisicing elit. Quia consequatur recusandae
                                            tempore fugit incidunt reiciendis tenetur.
                                            Sit, ipsum omnis consequatur molestiae amet,
                                            molestias error quos rem, accusamus nemo
                                            recusandae? Corrupti!
                                        </div>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-end">
                                    <div className="card rounded-4 max-width-60 mx-3 my-2 bg-light-purple">
                                        <div className="card-body text-white">
                                            Lorem ipsum dolor sit amet consectetur
                                            adipisicing elit. Quia consequatur recusandae
                                            tempore fugit incidunt reiciendis tenetur.
                                            Sit, ipsum omnis consequatur molestiae amet,
                                            molestias error quos rem, accusamus nemo
                                            recusandae? Corrupti!
                                        </div>
                                    </div>
                                </li>
                                <li className="d-flex justify-content-start">
                                    <div className="card rounded-4 max-width-60 mx-3 my-2 bg-light-gray">
                                        <div className="card-body">maybe later</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* Typing area */}
                        <div className="card-footer input-group bg-light-gray rounded-0">
                            <input
                                type="text"
                                className="form-control rounded-pill"
                                placeholder="Type a message"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Chat;
