import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

//styles
import './styles.css';

//icons
import warningIcon from '../../assets/images/icons/warning.svg';

interface ScheduleItemsProps {
    week_day: number; 
    from: string; 
    to: string;
}

const TeacherForm: React.FC = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const subjectOptions = [
        { value: 'Artes', label: 'Artes'},
        { value: 'Biologia', label: 'Biologia'},
        { value: 'Ciencias', label: 'Ciencias'},
        { value: 'Filosofia', label: 'Filosofia'},
        { value: 'Física', label: 'Física'},
        { value: 'Geografia', label: 'Geografia'},
        { value: 'História', label: 'História'},
        { value: 'Inglês', label: 'Inglês'},
        { value: 'Matemática', label: 'Matemática'},
        { value: 'Português', label: 'Português'},
        { value: 'Química', label: 'Química'},
        { value: 'Sociologia', label: 'Sociologia'},
    ];

    const [scheduleItems, setScheduleItems] = useState<ScheduleItemsProps[]>([
        {week_day: 0, from: '', to: ''}
    ]);

    const addNewScheduleItem = () => {
        setScheduleItems([
            ...scheduleItems,
            {week_day: 0, from: '', to: ''}
        ])
    } 
    const setScheduleItemValue = (index: number, field: string, value: string) => {
        const newScheduleItems = scheduleItems.map((scheduleItem, scheduleItemIndex) => {
            if (scheduleItemIndex === index) {
                return { ...scheduleItem, [field]: value }
            } 
            return scheduleItem;
        });
        setScheduleItems(newScheduleItems);
    }
    const removeScheduleItem = (week_day: number) => {
    } 

    const handleCreateClass = async (e: FormEvent) => {
        e.preventDefault();
    
        const data = {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }

        api.post('/classes', data)
        .then(()=>{
            alert('Cadastro realizado com sucesso!');
            history.push('/');
        })
        .catch(()=>{
            alert('Erro no cadastro');
        });
    }

    return (
        <div id="page-teacher-form" className="container">
            <Header 
                title='Que incrível que você quer dar aulas' 
                description='O primeiro passo é preencher esse formulário de inscrição'
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            name='name' 
                            label='Nome completo' 
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Input 
                            name='avatar' 
                            label='Avatar'
                            value={avatar}
                            onChange={e => setAvatar(e.target.value)}
                        />
                        <Input 
                            name='whatsapp' 
                            label='Whatsapp'
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        />
                        <Textarea 
                            name='bio' 
                            label='Biografia' 
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                        />
                    </fieldset>
                    
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Select 
                            name='subject' 
                            label='Matéria'
                            options = {subjectOptions}
                            value={subject} 
                            onChange={e => setSubject(e.target.value)}
                        />
                        <Input 
                            name='cost' 
                            label='Custo/hora'
                            value={cost} 
                            onChange={e => setCost(e.target.value)}
                        />
                    </fieldset>
                    
                    <fieldset>
                        <legend>
                            Horários disponívies
                            <button 
                                type='button'
                                onClick={addNewScheduleItem}
                            >
                                +  Novo horário
                            </button>    
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => (
                            <div key={scheduleItem.week_day} className='schedule-item' >
                                <Select 
                                    name='week_day' 
                                    label='Dia da semana'
                                    value={scheduleItem.week_day}
                                    onChange={(e)=>setScheduleItemValue(index,'week_day',e.target.value)}
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
                                    name='from' 
                                    label='Das' 
                                    type='time'
                                    value={scheduleItem.from}
                                    onChange={(e)=>setScheduleItemValue(index,'from',e.target.value)}
                                />

                                <Input 
                                    name='to' 
                                    label='Até' 
                                    type='time'
                                    value={scheduleItem.to}
                                    onChange={(e)=>setScheduleItemValue(index,'to',e.target.value)}
                                />

                            </div>
                        ))}

                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type='submit'>
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;