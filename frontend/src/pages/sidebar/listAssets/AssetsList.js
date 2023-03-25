import React from "react";
import Table from "./TableAssets";


export default () => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>Lista de Ativos</h4>
                    <p className="mb-0">Consulte os detalhes dos seus ativos</p>
                </div>
            </div>

            <div className="table-settings mb-4">
                <Table/>
            </div>
        </>
    );
};
