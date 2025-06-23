import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("about");

  return (
    <section
      className="container px-6 w-full mx-auto mt-20 mb-20"
      id="about">
      <h3 className="text-3xl ">{t("title")}</h3>
      <div className="flex flex-col gap-5 mt-6 text-lg">
        <p className="font-medium">{t("description")}</p>
        <div className="flex flex-col gap-2">
          {(t.raw("content") as string[]).map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
