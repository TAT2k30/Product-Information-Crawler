
import Product from '../../../components/products/Product';
import { ViewProps } from '../../../rules/props/ViewProps';

function ViewPage({ currentBodyLightMode, currentShadowLightMode, currentTextLightMode }: ViewProps) {
    return (
        <div>
            <Product currentBodyLightMode={currentBodyLightMode} currentShadowLightMode={currentShadowLightMode} currentTextLightMode={currentTextLightMode} />
        </div>
    );
}

export default ViewPage;