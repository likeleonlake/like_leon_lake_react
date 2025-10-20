export default function Header() {
  return (
    <header class="shadow-deep">
        <nav class="nav-cont">
            <ul class="nav-links-cont">
                <li><a class="nav-links logo-container" href="">
                    <svg width="38" height="38" viewBox="0 0 80 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.3487 53L26.7043 51.5778L27.8421 51.4C28.9799 51.2222 29.3354 50.4044 29.3354 49.2311V29.5333L25.9576 29.7111L26.3132 27.7556H36.8376L36.4821 29.1778L34.6687 29.3556C33.3176 29.4978 32.7132 30.1733 32.7132 31.6667V51.2222H38.5799C40.7843 51.2222 43.0243 48.5556 44.3754 45.3911H45.2643L43.8421 53.7111C42.4199 53.0711 41.0332 53 39.611 53H26.3487ZM38.651 29.7111L39.0065 27.7556H49.531L49.1754 29.1778L47.3621 29.3556C46.011 29.4978 45.4065 30.1733 45.4065 31.6667V41.2667H48.0732C50.2776 41.2667 52.5176 38.6 53.8687 35.4356H54.7576L53.3354 43.7556C51.9132 43.1156 50.5265 43.0444 49.1043 43.0444H39.0421L39.3976 41.6222L40.5354 41.4444C41.6732 41.2667 42.0287 40.4489 42.0287 39.2756V29.5333L38.651 29.7111Z"/>
                    </svg></a></li>
                <li><a class="nav-links" href="">Work<span class="nav counter">4</span></a></li>
                <li><a class="nav-links" href="">Articles<span class="nav counter">4</span></a></li>
                <li><a class="nav-links" href="">About</a></li>
                <li><a class="nav-links" href="">Playground</a></li>
            </ul>
            <div class="button-cont">
                <button class="primary shadow-deep">Contact</button>
            </div>
        </nav>    
    </header>
  );
}