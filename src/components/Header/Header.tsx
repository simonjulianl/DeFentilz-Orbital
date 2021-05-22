import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Header.module.scss';

interface Props {
    appTitle: string;
}

const Header = (props: Props) => (
    <Link href="/">
        <div className={styles.Header}>
            <div>
                <Image src="/4.png" width="70" height="35"></Image>
            </div>
            <div>
                {props.appTitle}
            </div>
        </div>
    </Link>
);
  
export default Header;