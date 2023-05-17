import React from "react";

function MessageBoard(props) {
    return (
        <div className="card-body p-0">
            <ul className="list-unstyled overflow-auto m-0 pt-2" id="chat">
                <li className="d-flex justify-content-start">
                    <div className="card rounded-4 max-width-60 mx-3 my-2 bg-light-gray">
                        <div className="card-body">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                            consequatur recusandae tempore fugit incidunt reiciendis
                            tenetur. Sit, ipsum omnis consequatur molestiae amet,
                            molestias error quos rem, accusamus nemo recusandae? Corrupti!
                        </div>
                    </div>
                </li>
                <li className="d-flex justify-content-end">
                    <div className="card rounded-4 max-width-60 mx-3 my-2 bg-light-purple">
                        <div className="card-body text-white">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                            consequatur recusandae tempore fugit incidunt reiciendis
                            tenetur. Sit, ipsum omnis consequatur molestiae amet,
                            molestias error quos rem, accusamus nemo recusandae? Corrupti!
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
    );
}

export default MessageBoard;
