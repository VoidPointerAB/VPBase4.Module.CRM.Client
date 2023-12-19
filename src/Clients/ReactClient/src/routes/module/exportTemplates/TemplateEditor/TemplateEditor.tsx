import React, { useState } from 'react';
import _ from 'lodash';

import { EditorState, TemplateProperty } from '../exportTemplates';
import { PropertyManager } from '../PropertyManager/PropertyManager';

import checkboxStyle from 'components/module/Form/Checkbox/Checkbox.module.css';
import styles from './TemplateEditor.module.css';

interface TemplateEditorProps {
    editorState: EditorState;
    name: string;
    isPersonal: boolean;
    entityProperties: TemplateProperty[] | null;
    isWaitingForServerResponse: boolean;
    update(name: string, properties: TemplateProperty[]): void;
    create(name: string, isPersonal: boolean, properties: TemplateProperty[]): void;
    close(): void;
}

export const TemplateEditor = (props: TemplateEditorProps) => {
    const [name, setName] = useState(props.name);
    const [isPersonal, setIsPersonal] = useState(props.isPersonal);
    const [items, setItems] = useState(props.entityProperties);
    const [marked, setMarked] = useState([] as string[]);

    const handleMarking = (id: string) => {
        if (_.includes(marked, id)) {
            setMarked(marked.filter(markedId => markedId !== id));
        } else {
            setMarked([...marked, id]);
        }
    };

    const moveToSelected = () => {
        const updatedMarked = marked.filter(markedId =>
            _.find(items, { id: markedId, selected: true })
        );
        
        if (!items) {
            return null;
        }
        const current = [];
        const newlySelected = [];
        for (const item of items) {
            if (item.selected) {
                current.push(item);
            } else if (_.includes(marked, item.id)) {
                newlySelected.push({ ...item, selected: true });
            } else {
                current.push(item);
            }
        }

        setItems([...current, ..._.orderBy(newlySelected, ['title'])]);
        setMarked(updatedMarked);
    };

    const moveToNotSelected = () => {
        const updatedMarked = marked.filter(markedId =>
            _.find(items, { id: markedId, selected: false })
        );
        const updatedItems = items && items.map(item => {
            if (!item.selected) {
                return item;
            }

            if (_.includes(marked, item.id)) {
                return { ...item, selected: false };
            }

            return item;
        });

        setItems(updatedItems);
        setMarked(updatedMarked);
    };

    const setAllSelected = () => {
        if(!items) return null;
        const updatedItems = _.orderBy(items.map(item => ({ ...item, selected: true })), ['title']);
        setMarked([]);
        setItems(updatedItems);
    };

    const setAllNotSelected = () => {
        if(!items) return null;
        const updatedItems = _.orderBy(items.map(item => ({ ...item, selected: false })), [
            'title',
        ]);
        setMarked([]);
        setItems(updatedItems);
    };

    const moveUp = (id: string) => {
        if(!items) return null;
        let selectedItems = items.filter(item => item.selected);
        const notSelectedItems = items.filter(item => !item.selected);

        if (selectedItems[0].id === id) {
            return;
        }

        const newIndex = _.findIndex(selectedItems, { id: id });
        const temp = selectedItems[newIndex - 1];
        selectedItems[newIndex - 1] = selectedItems[newIndex];
        selectedItems[newIndex] = temp;

        setItems([...selectedItems, ...notSelectedItems]);
    };

    const moveDown = (id: string) => {
        if(!items) return null;
        let selectedItems = items.filter(item => item.selected);
        const notSelectedItems = items.filter(item => !item.selected);

        if (selectedItems[selectedItems.length - 1].id === id) {
            return;
        }

        const newIndex = _.findIndex(selectedItems, { id: id });
        const temp = selectedItems[newIndex + 1];
        selectedItems[newIndex + 1] = selectedItems[newIndex];
        selectedItems[newIndex] = temp;

        setItems([...selectedItems, ...notSelectedItems]);
    };

    const update = () => {
        if(!items) return null;
        props.update(name.trim(), items.filter(item => item.selected));
    };

    const create = () => {
        if(!items) return null;
        props.create(name.trim(), isPersonal, items.filter(item => item.selected));
    };

    return (
        <div className={styles.templateEditor}>
            <h4>Template name</h4>
            <div className={styles.options}>
                <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <div className={styles.isPersonal}>
                    <label className={checkboxStyle.container}>
                        <input
                            type="checkbox"
                            checked={isPersonal}
                            disabled={props.editorState === 'EDIT'}
                            onChange={() => setIsPersonal(!isPersonal)}
                        />
                        <span className={checkboxStyle.checkmark} />
                    </label>
                    <label className={styles.isPersonalLabel}>Personal template</label>
                </div>
            </div>

            <PropertyManager
                items={items}
                marked={marked}
                handleMarking={handleMarking}
                moveToSelected={moveToSelected}
                moveToNotSelected={moveToNotSelected}
                moveUp={moveUp}
                moveDown={moveDown}
                setAllSelected={setAllSelected}
                setAllNotSelected={setAllNotSelected}
            />

            <div className={styles.buttonContainer}>
                <button className="btn btn-default mr-3" onClick={props.close}>
                    Cancel
                </button>

                {props.editorState === 'EDIT' && (
                    <button className="btn btn-primary" disabled={props.isWaitingForServerResponse} onClick={update}>
                        Save template
                    </button>
                )}

                {props.editorState === 'CREATE' && (
                    <button className="btn btn-primary" disabled={props.isWaitingForServerResponse} onClick={create}>
                        Create template
                    </button>
                )}
            </div>
        </div>
    );
};
