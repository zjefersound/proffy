import React from 'react';
import api from '../../services/api';

import'./styles.css';

//icons
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

export interface Teacher{
    id: number,
    user_id: number;
    subject: string,
    cost: number,
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string
}
interface TeacherItemProps {
    teacher: Teacher;
}
const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    const handleCreateConnection = () =>{
        api.post('/connections',{
            user_id: teacher.user_id
        });
    }
    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt="foto"/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>
                {teacher.bio}
            </p>
            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a  target='_blank'
                    onClick={handleCreateConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                    <img src={whatsappIcon} alt="whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;