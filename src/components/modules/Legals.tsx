import { useTranslations } from "next-intl";

type Section = {
  title: string;
  content: { 
    type: "paragraph" | "list";
    text: string 
  }[];
};

interface LegalsProps {
    name: string;
}
export function Legals({ name }: LegalsProps) {

  const t = useTranslations(name);

  return (
    <section className="container px-6 w-full mx-auto mt-20 mb-20" id="contact">
      {(t.raw("sections") as Section[]).map((sections, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{sections.title}</h2>
          {
            sections.content.map((content, contentIndex) => (
              content.type === "list" ? (
                <ul key={contentIndex} className="list-disc pl-6 mb-2">
                  <li>{content.text}</li>
                </ul>
              ) : (
                <p key={contentIndex} className="mb-2">
                  {content.text.split("{a}")[0]}
                  {content.text.includes('{a}') && <a className="hover:underline underline-offset-2" href={process.env.NEXT_PUBLIC_APP_URL}>{process.env.NEXT_PUBLIC_APP_URL}</a>}
                  {content.text.split("{a}")[1]}
                </p>
              )
            ))
          }
        </div>
      ))}
    </section>
  );
}