import React, { useState, FormEvent } from 'react';

import Header from '../../components/Header';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

//styles
import './styles.css';
import api from '../../services/api';
import { useRequest } from '../../hooks/useFetch';

const TeacherList: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [time, setTime] = useState('');
    const [subject, setSubject] = useState('');
    const [weekDay, setWeekDay] = useState('');

    const subjectOptions = [
        { value: 'Artes', label: 'Artes' },
        { value: 'Biologia', label: 'Biologia' },
        { value: 'Ciencias', label: 'Ciencias' },
        { value: 'Filosofia', label: 'Filosofia' },
        { value: 'Física', label: 'Física' },
        { value: 'Geografia', label: 'Geografia' },
        { value: 'História', label: 'História' },
        { value: 'Inglês', label: 'Inglês' },
        { value: 'Matemática', label: 'Matemática' },
        { value: 'Português', label: 'Português' },
        { value: 'Química', label: 'Química' },
        { value: 'Sociologia', label: 'Sociologia' },
    ];

    // const { data } = useRequest<Teacher[]>({
    //     baseURL: 'http://localhost:3333',
    //     method: 'GET',
    //     url: '/classes',
    //   });
    // if(data){
    //     setTeachers(data);
    // }
    const searchTeachers = async (e: FormEvent) => {
        e.preventDefault();
        const response = await api.get('/classes',{
            params: {
                time,
                subject,
                week_day: weekDay
            }
        });
        setTeachers(response.data);
    };
    return (
        <div id="page-teacher-list" className="container">
            <Header title='Esses são os proffys disponíveis'>
                <form id="search-teachers" onSubmit={ searchTeachers }>
                    <Select 
                        name='subject' 
                        label='Matéria' 
                        options={subjectOptions}
                        value={subject}
                        onChange={(e)=>setSubject(e.target.value)} 
                    />
                    <Select 
                        name='week_day' 
                        label='Dia da semana'
                        value={weekDay}
                        onChange={(e)=>setWeekDay(e.target.value)} 
                        options={[
                            { value: '0', label: 'Segunda-feira'},
                            { value: '1', label: 'Terça-feira'},
                            { value: '2', label: 'Quarta-feira'},
                            { value: '3', label: 'Quinta-feira'},
                            { value: '4', label: 'Sexta-feira'},
                            { value: '5', label: 'Sábado'},
                            { value: '6', label: 'Domingo'},
                        ]}
                    />
                    <Input 
                        type='time' 
                        name='time' 
                        label='Horário'
                        value={time}
                        onChange={(e)=>setTime(e.target.value)} 
                    />

                    <button type='submit'>Buscar</button>
                </form>
            </Header>
            <main>
                {teachers.map((teacher: Teacher)=>{
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher}/>
                    );
                })}
            </main>
        </div>
    );
}

export default TeacherList;