import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { ScButton } from "../../../button";
import { StyleType } from "../../enums";
import { ElementModel } from "../../models";

export const EditorBlock: React.FC = observer(() => {

    const mainEl = useRef<HTMLDivElement | null>(null);

    const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            return false;
        }
        return true;
    }

    const boldHandler = () => {
        const selection = document.getSelection();

        if (mainEl.current && selection) {


            mainEl.current.innerHTML = ElementModel.applyStyleToSelection(mainEl.current, selection, StyleType.bold);
        }
    }

    const italicHandler = () => {
        const selection = document.getSelection();

        if (mainEl.current && selection) {


            mainEl.current.innerHTML = ElementModel.applyStyleToSelection(mainEl.current, selection, StyleType.italic);
        }
    }

    const clearHandler = () => {
        const selection = document.getSelection();

        if (mainEl.current && selection) {


            mainEl.current.innerHTML = ElementModel.applyStyleToSelection(mainEl.current, selection, StyleType.clear);
        }
    }

    const pasteHandler = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();

        if (mainEl.current) {
            const clipboardData = e.clipboardData;
            const text = clipboardData.getData('Text').replace(/(?:\r\n|\r|\n)/g, ' ');

            mainEl.current.innerHTML = text;
        }
        
    }

    return (
        <>
        <div 
            contentEditable={true}
            ref={mainEl}
            suppressContentEditableWarning={true}
            onKeyDown={(e) => keyDownHandler(e)}
            onPaste={(e) => pasteHandler(e)}
        >
            <b>BOLD<i>italic</i></b><b><i>bold</i>BOLD</b>
        </div>
        <ScButton onClick={boldHandler}>Bold</ScButton>
        <ScButton onClick={italicHandler}>Italic</ScButton>
        <ScButton onClick={clearHandler}>Clear</ScButton>
        </>
        
    )
});
