import React, { useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/set';

import TextField from '../../../shared/TextField';
import RichTextArea from '../../../shared/RichTextArea';
import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';
import { addItem } from '../../../utils';
import ItemActions from '../../../shared/ItemActions';
import ItemHeading from '../../../shared/ItemHeading';
import AddItemButton from '../../../shared/AddItemButton';

const ReferencesTab = ({ data, config, onChange }) => {
    const context = useContext(AppContext);
    const { dispatch } = context;

    return (
        <>
            <div className="mb-6 grid grid-cols-6 items-center">
            <div className="col-span-1">
                <Checkbox
                checked={config.references.enable}
                onChange={v => onChange('config.references.enable', v)}
                />
            </div>
            <div className="col-span-5">
                <TextField
                placeholder="Heading"
                value={config.references.heading}
                onChange={v => onChange('config.references.heading', v)}
                />
            </div>
            </div>

            <hr className="my-6" />

            {
                data.references.map((x, index) => 
                    <Item
                        item={x}
                        key={x.id}
                        index={index}
                        onChange={onChange}
                        dispatch={dispatch}
                        first={index === 0}
                        last={index === data.references.length - 1}
                    />
                )
            }

            <AddItem heading={config.references.heading} dispatch={dispatch} />
        </>
    );
};

const Form = ({ item, onChange, identifier = '' }) => {
    const { t } = useTranslation(['sideBar', 'app']);

    return (
        <div>
            <TextField
                className="mb-6"
                label={t('references.name.label')}
                placeholder="Richard Hendricks"
                value={item.name}
                onChange={v => onChange(`${identifier}name`, v)}
            />

            <TextField
                className="mb-6"
                label={t('references.position.label')}
                placeholder="CEO, Pied Piper"
                value={item.position}
                onChange={v => onChange(`${identifier}position`, v)}
            />

            <TextField
                className="mb-6"
                label={t('references.phone.label')}
                placeholder="+1 541 754 3010"
                value={item.phone}
                onChange={v => onChange(`${identifier}phone`, v)}
            />

            <TextField
                className="mb-6"
                label={t('references.email.label')}
                placeholder="richard@piedpiper.com"
                value={item.email}
                onChange={v => onChange(`${identifier}email`, v)}
            />

            <RichTextArea
                className="mb-6"
                label={t('app:item.description.label')}
                value={item.description}
                onChange={v => onChange(`${identifier}description`, v)}
                narrow
            />

        </div>
    );
};

const AddItem = ({ heading, dispatch }) => {
    const [isOpen, setOpen] = useState(false);
    const [item, setItem] = useState({
        id: uuidv4(),
        enable: true,
        name: '',
        position: '',
        phone: '',
        email: '',
        description: '',
    });

    const onChange = (key, value) => setItem(set({ ...item }, key, value));

    const onSubmit = () => {
        if (item.name === '' || item.position === '') return;

        addItem(dispatch, 'references', item);

        setItem({
            id: uuidv4(),
            enable: true,
            name: '',
            position: '',
            phone: '',
            email: '',
            description: '',
        });

        setOpen(false);
    };

    return (
        <div className="my-4 border border-gray-200 rounded p-5">
            <ItemHeading heading={heading} setOpen={setOpen} isOpen={isOpen} />

            <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
                <Form item={item} onChange={onChange} />

                <AddItemButton onSubmit={onSubmit} />
            </div>
        </div>
    );
};

const Item = ({ item, index, onChange, dispatch, first, last }) => {
    const [isOpen, setOpen] = useState(false);
    const identifier = `data.references[${index}].`;
    const itemRef = useRef(null);

    return (
        <div className="my-4 border border-gray-200 rounded p-5 animate__animated" ref={itemRef}>
            <ItemHeading title={item.name} setOpen={setOpen} isOpen={isOpen} />

            <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
                <Form item={item} onChange={onChange} identifier={identifier} />

                <ItemActions
                    dispatch={dispatch}
                    first={first}
                    identifier={identifier}
                    item={item}
                    last={last}
                    onChange={onChange}
                    itemRef={itemRef}
                    setOpen={setOpen}
                    type="references"
                />
            </div>
        </div>
    );
};

export default ReferencesTab;
