import { Request, Response } from 'express';
import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface scheduleItemProps {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    async index(request: Request, response: Response) {
        const filters = request.query;

        if(!filters.week_day || !filters.subject || !filters.time) {
            // return response.sendStatus(400).json({
            //     error: 'Missing filter to search classess'
            // })
            const classes = await db('classes')
                .join('users', 'classes.user_id', '=', 'users.id')
                .select('classes.*','users.*');
            return response.json(classes).sendStatus(200);
        }

        const time = filters.time as string;
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;

        const timeInMinutes = convertHoursToMinutes(time);

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ?? ',[Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select('classes.*','users.*');
        return response.json(classes).sendStatus(200);
        

    }
    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        const trx = await db.transaction();
        
        try {
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });
    
            const user_id = insertedUsersIds[0];
    
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            });
    
            const class_id = insertedClassesIds[0];
    
            const classSchedule = schedule.map((scheduleItem: scheduleItemProps) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHoursToMinutes(scheduleItem.from),
                    to: convertHoursToMinutes(scheduleItem.to),
                }
            });
            await trx('class_schedule').insert(classSchedule);
    
            await trx.commit();
    
            return response.sendStatus(201);
        } catch(err){
            trx.rollback();
            return response.sendStatus(400).json({
                error: 'Unexpected error while creating new class',
                err
            });
        }
    }
}