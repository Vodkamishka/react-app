import React, {FC, useState} from 'react';
import {Form, Input, DatePicker, Row, Button, Select} from 'antd';
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser"
import {IEvent} from "../models/IEvents";
import {Moment} from 'moment';
import {formatDate} from '../utils/date';
import {useTypedSelector} from '../hooks/useTypedSelector';

const {Option} = Select;

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {

    const [event, setEvent] = useState<IEvent>({
        author: '',
        guest: '',
        date: '',
        description: ''
    });

    const {user} = useTypedSelector(state => state.auth);

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    };

    const submitForm = () => {
        props.submit({...event, author: user.username})

    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Description Event"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setEvent({...event, description: e.target.value})}
                    value={event.description}
                />
            </Form.Item>
            <Form.Item
                label="Date Event"
                name="date"
                rules={[rules.required(), rules.isDateAfter("Cannot create event in the past")]}
            >
                <DatePicker
                    onChange={date => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label="Select guest"
                name="guest"
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                   {props.guests.map(guest =>
                        <Option value={guest.username} key={guest.username}>
                            {guest.username}
                        </Option>
                   )}
                </Select>
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Row>

        </Form>
    )

};

export default EventForm;