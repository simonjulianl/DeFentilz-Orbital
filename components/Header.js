import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
  
const Header = (props) => (
    <Link href="/">
        <div className={styles.Header}>
            <div>
                <Image src="/3-removebg-preview.png" width="200" height="200"></Image>
            </div>
            <div>
                {props.appTitle}
            </div>
        </div>
    </Link>
);
  
export default Header;