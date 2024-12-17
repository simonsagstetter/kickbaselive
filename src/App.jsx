import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import Background from "./components/05_atoms/Background";
import BackgroundImage from "./assets/images/stadium.jpg";
import BackgroundImage2 from "./assets/images/loginbackground.svg";
import BackgroundImage3 from "./assets/images/kimmich.jpg";

/**
 * Main application component.
 *
 * This component initializes the router and sets a background image based on a random value.
 * The background image is chosen from three possible images.
 *
 * @returns {JSX.Element} The rendered application component.
 */
function App() {
    const rand = Math.random().toFixed(1);

    return (
        <>
            <RouterProvider router={router} />
            <Background
                src={rand <= 0.3 ? BackgroundImage : rand > 0.3 && rand <= 0.7 ? BackgroundImage2 : BackgroundImage3}
                alt="Background Image"
            />
        </>
    );
}

export default App;
