import styles from './SectionTitle.module.css';

interface Props {
  kicker: string;
  title: string;
  children?: React.ReactNode;
}

export default function SectionTitle({ kicker, title, children }: Props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.kicker}>{kicker}</p>
      <h2 className={styles.title}>{title}</h2>
      {children && <p className={styles.text}>{children}</p>}
    </div>
  );
}
