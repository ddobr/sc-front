import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";

import styles from './YoutubeEmbedComponent.module.scss';

interface Props {
    url: string,
}

export const YoutubeEmbedComponent: React.FC<Props> = observer(({url}) => {
    const contentRef = useRef<HTMLIFrameElement>(null);
    const [contentHeight, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current?.clientWidth)
            setHeight(contentRef.current?.clientWidth * 9 / 16);
    }, []);
    
    return (
        <div>
        <iframe 
            className={styles.embed}
            width="100%" 
            height={contentHeight} 
            ref={contentRef} 
            src={url} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
        >
        </iframe>
        </div>
    )
});
