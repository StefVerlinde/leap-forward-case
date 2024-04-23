interface TitleProps {
    title: string;
}

const Title = ({ title }: TitleProps) => <h1 className="text-white text-xl font-bold">{title}</h1>;

export default Title;