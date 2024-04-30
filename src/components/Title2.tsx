interface TitleProps {
    title: string;
}

const Title = ({ title }: TitleProps) => <h1 className="text-white text-xl font-medium">{title}</h1>;

export default Title;