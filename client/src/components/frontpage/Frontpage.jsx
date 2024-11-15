import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
export default function Frontpage() {
    return (
        <>
            <div className="main1 flex flex-col">
                <div className="page1"><Page1/></div>
                <div className="page2"><Page2/></div>
                <div className="page3"><Page3/></div>
                <div className="page4"><Page4/></div>
            </div>
        </>
    );
}
