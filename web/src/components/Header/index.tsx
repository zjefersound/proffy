import React from 'react';
import { Link, useHistory } from 'react-router-dom';

//images
import logoImg from '../../assets/images/logo.svg';

//icons
import backIcon from '../../assets/images/icons/back.svg';

//styles
import './styles.css';

interface HeaderProps {
    title: string;
    description?: string;
}

const Header: React.FC<HeaderProps> = (props) => {

    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to='/'>
                    <img src={backIcon} alt="Voltar"/>
                </Link>
                <img src={logoImg} alt="Proffy"/>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                {props.description && <p>{props.description}</p>}
                {props.children}
            </div>
        </header>
    );
}

export default Header;