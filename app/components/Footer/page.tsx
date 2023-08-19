import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
import { render } from 'react-dom';

const WebsiteFooter = () => {
    return (
        <div className=''>
        <Footer
            columns={[
                {
                    title: 'Team',
                    items: [
                        {
                            title: 'Juan Cabrera',
                            url: 'https://github.com/juanedcabrera',
                            openExternal: true,
                        },
                        {
                            title: 'Myles Wiegel',
                            url: 'https://github.com/mylesw27',
                            openExternal: true,
                        },
                    ],
                },
                {
                    title: 'Support',
                    items: [
                        {
                            title: 'Suggestions',
                            url: 'https://www.google.com',
                            openExternal: true,
                        },
                        {
                            title: 'Bug Report',
                            url: 'https://ant.design',
                            openExternal: true,
                        },
                        {
                            title: 'Work on Github Issues',
                            url: 'www.github.com',
                            openExternal: true,
                        },
                    ],
                },
            ]}
        />
        </div>
    );
}

export default WebsiteFooter;
