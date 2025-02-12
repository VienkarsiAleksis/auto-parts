import style from "../Pages/Products/Product.module.scss";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 justify-center">
            <div className={`w-[50%] bg-white shadow-md overflow-hidden sm:rounded-lg flex ${style.auth_border}`}>
            <div className={style.side_bg}>
                    <img src="https://snaptradingme.com/wp-content/uploads/2018/07/Car-Parts-Wallpaper-22.jpg" alt="" />
                </div>
                {children}
            </div>
        </div>
    );
}
