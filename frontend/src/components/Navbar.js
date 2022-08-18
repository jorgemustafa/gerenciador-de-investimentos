import React, {Component} from "react";
import * as FaIcons from "react-icons/fa";
import {Link} from "react-router-dom"

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className='nav-bar'>
                    <Link to='#' className='setSidebar'>
                        <FaIcons.FaBars/>
                    </Link>
                    <Link to='/' className='resumo'>
                        <div>
                        <FaIcons.FaHome/>
                            Resumo
                        </div>
                    </Link>
                     <Link to='desempenho' className='desempenho'>
                        <div>
                        <FaIcons.FaChartLine/>
                            Desempenho
                        </div>
                    </Link>
                    <Link to='extrato' className='extrato'>
                        <div>
                        <FaIcons.FaScroll/>
                            Extrato
                        </div>
                    </Link>

                    <Link to='rebalanceamento' className='rebalanceamento'>
                        <div>
                        <FaIcons.FaBalanceScale/>
                            Rebalanceamento
                        </div>
                    </Link>

                </div>
            </>
        )
    }
}