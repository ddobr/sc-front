
import { observer } from 'mobx-react-lite';
import { Skeleton } from '../../../../../../common/components/ui-no-interact';
import { IReadContent, ReadContentType } from '../../../../../../common/models';
import { HighlightComponent } from '../ContentComponents/HighlightComponent';
import { ImageComponent } from '../ContentComponents/ImageComponent';
import { ParagraphContent } from '../ContentComponents/ParagraphComponent';
import { YoutubeEmbedComponent } from '../ContentComponents/YoutubeEmbedComponent';

import styles from './PageContent.module.scss';


interface Props {
    content: IReadContent[],
}

export const PageContent: React.FC<Props> = observer(({content}) => {
    if (content.length === 0) {
        return (
            <>
            <Skeleton height='10rem' />
            <Skeleton height='15rem' />
            </>
        )
    }

    const blocks = content.map((block, i) => GenerateComponentByType(block, i));

    return (
        <div className={styles.pageContent}>
            {blocks}
        </div>
    )
});

function GenerateComponentByType(block: IReadContent, key: number|string) {
    switch (block.type) {
        case ReadContentType.Paragraph:
            return (<ParagraphContent key={key} text={block.entity}/>);
        case ReadContentType.Highlight:
            return (<HighlightComponent key={key} text={block.entity}/>);
        case ReadContentType.Image:
            return (<ImageComponent key={key} url={block.entity}/>);
        case ReadContentType.Youtube:
            return (<YoutubeEmbedComponent key={key} url={block.entity} />);
        default:
            return <p style={{'color': 'red'}}>to be implemented.</p>
    }
}
