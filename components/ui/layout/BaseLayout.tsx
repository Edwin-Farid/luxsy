import { FunctionComponent } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from "../navbar";
import Footer from "@ui/footer";
interface Props {
    children: React.ReactNode;
}

const BaseLayout: FunctionComponent<Props> = ({ children }) => {

    return (
        <>
            <HelmetProvider>
                <div className="App">
                    <Helmet>
                        <title>Luxsy</title>
                        <meta name="description" content="Luxsy is a art marketplace blockchain that focus sell art from Lombok Artist" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta name="author" content="Luxsy" />
                        <meta property="og:title" content="Luxsy" />
                        <meta property="og:description" content="Luxsy is a art marketplace blockchain that focus sell art from Lombok Artist" />
                        <meta property="og:image" content="https://example.com/image.jpg" />
                        <meta property="og:url" content="https://example.com/my-page" />
                        <meta name="twitter:title" content="Luxsy" />
                        <meta name="twitter:description" content="Luxsy is a art marketplace blockchain that focus sell art from Lombok Artist" />
                        <meta name="twitter:image" content="https://example.com/image.jpg" />
                        <meta name="twitter:card" content="summary_large_image" />
                    </Helmet>
                    <Navbar />
                    {children}
                    <Footer />
                </div>
            </HelmetProvider>
        </>
    )
}

export default BaseLayout;