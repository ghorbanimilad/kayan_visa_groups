import Breadcrumb from "@/components/Beadcrunmb";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

type SectionSettings = {
  showVisaCover: boolean;
  coverBlockSize: number; // ← اصلاح شده
  showContents: boolean;
  contentTextAlign: "left" | "center" | "justify";
  showSidebar: boolean;
  sidebarBgColor: string;
  showBanner: boolean;
  bannerBgFrom: string;
  bannerBgTo: string;
};

const defaultSettings: SectionSettings = {
  showVisaCover: true,
  coverBlockSize: 400, // ← اصلاح شده
  showContents: true,
  contentTextAlign: "justify",
  showSidebar: true,
  sidebarBgColor: "bg-gray-50",
  showBanner: true,
  bannerBgFrom: "from-gray-300",
  bannerBgTo: "to-gray-100",
};
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const visaType = await prisma.visaType.findFirst({
    where: {
      slug: params.visaSlug,
      countries: { some: { slug: params.countrySlug } },
    },
  });

  const country = visaType
    ? await prisma.country.findUnique({
      where: { slug: params.countrySlug },
    })
    : null;

  const title = visaType && country
    ? `${visaType.name} | ویزای ${country.name} | مشاوره مهاجرت`
    : "ویزای مورد نظر یافت نشد";

  const description = visaType && country
    ? `اطلاعات کامل در مورد ویزای ${visaType.name} کشور ${country.name}. مزایا، شرایط، هزینه‌ها و نحوه اقدام.`
    : "اطلاعات ویزای مورد نظر یافت نشد.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://yourwebsite.com/${params.countrySlug}/${params.visaSlug}`,
      images: [
        {
          url: country?.imageUrl || "/images/default-og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [country?.imageUrl || "/images/default-og-image.jpg"],
    },
  };
}

// بنرها
const BannerComponent = ({ text, buttonText, buttonLink, bgFrom, bgTo }: any) => (
  <div
    className={`flex flex-col md:flex-row space-y-3 md:space-y-0 items-center justify-around my-6 p-6 bg-gradient-to-br ${bgFrom} ${bgTo} rounded-lg`}
  >
    <h3 className="text-lg font-bold text-white text-center">{text}</h3>
    <Link
      href={buttonLink}
      className="bg-red-500 text-white text-md font-extralight transition-all duration-200 hover:bg-red-500 hover:text-white px-6 py-2.5 rounded-md tracking-wide"
    >
      {buttonText}
    </Link>
  </div>
);

const BannerSecondaryComponent = ({ title, subtitle, linkText, linkUrl }: any) => (
  <div className="my-6 p-8 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between">
    <div className="text-center md:text-right mb-4 md:mb-0">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-sm opacity-90 mt-2">{subtitle}</p>
    </div>
    <Link
      href={linkUrl}
      className="bg-white text-red-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-all"
    >
      {linkText}
    </Link>
  </div>
);

const BannerThirdComponent = ({ title, subtitle, linkText, linkUrl }: any) => (
  <div className="my-6 p-8 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between">
    <div className="text-center md:text-right mb-4 md:mb-0">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-sm opacity-90 mt-2">{subtitle}</p>
    </div>
    <Link
      href={linkUrl}
      className="bg-red-500 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-white hover:text-red-500 transition-all"
    >
      {linkText}
    </Link>
  </div>
);

export default async function CountryPage(props: any) {
  const params = await props.params;
  const visaSlug = params.visaSlug;
  const countrySlug = params.countrySlug;

  const visaType = await prisma.visaType.findFirst({
    where: {
      slug: visaSlug,
      countries: { some: { slug: countrySlug } },
    },
  });

  if (!visaType) return <div>ویزای مورد نظر یافت نشد</div>;

  const country = await prisma.country.findUnique({
    where: { slug: countrySlug },
    include: {
      contents: { where: { visaTypes: { some: { id: visaType.id } } } },
      visaCovers: true,
    },
  });

  if (!country) return <div>کشور مورد نظر یافت نشد</div>;

  const visaCover = country.visaCovers?.find((c) => c.visaTypeId === visaType.id)?.coverImage;

  const settings: SectionSettings = {
    ...defaultSettings,
    coverBlockSize: 500,
    sidebarBgColor: "bg-white",
    bannerBgFrom: "from-gray-800",
    bannerBgTo: "to-gray-600",
  };

  return (
    <>
      <div className="m-4 container mx-auto">
        <Breadcrumb />
        <hr className="border-gray-300 my-4" />
      </div>

      <div className="flex mx-4 gap-4">
        <main className="flex-[4]">
          {/* کاور ویزا */}
          <div className="relative w-full h-[400px]">
            {visaCover && (
              <Image
                src={visaCover}
                alt={`${country.name} - ${visaType.name}`}
                width={400}
                height={400}
                className="object-contain w-full h-full"
              />
            )}
          </div>

          {/* محتواها */}
          {settings.showContents &&
            country.contents.map((content, index) => (
              <section
                key={content.id}
                className={`mb-2 p-6 container mx-auto rounded-lg ${content.section === "benefits" ? "bg-red-500" : "bg-white"
                  }`}
              >
                <h2 className="text-xl font-bold text-gray-50 rounded py-4 mb-4 text-center bg-gray-800 border-gray-200 ">
                  {content.title ||
                    (content.section === "introduction"
                      ? "معرفی ویزا"
                      : content.section === "benefits"
                        ? "مزایا"
                        : content.section === "requirements"
                          ? "شرایط و مدارک"
                          : content.section === "fees"
                            ? "هزینه‌ها"
                            : content.section === "visaType"
                              ? "نوع ویزا"
                              : content.section === "process"
                                ? "فرایند"
                                : content.section === "contact"
                                  ? "تماس"
                                  : content.section === "renewal"
                                    ? "تمدید"
                                    : content.section === "opportunities"
                                      ? "فرصت‌ها"
                                      : content.section === "tips"
                                        ? "نکات"
                                        : "بدون عنوان")}
                </h2>

                <div
                  dir="rtl"
                  className={`overflow-x-auto max-w-none ${content.section === "benefits" ? "bg-red-500" : "bg-white"
                    } p-4`}
                >
                  <div
                    className="ck-content prose prose-rose prose-ul:list-disc prose-li:ml-6 leading-7 text-justify"
                    style={{ fontFamily: "IranSans, sans-serif", lineHeight: "2" }}
                    dangerouslySetInnerHTML={{ __html: content.body }}
                  />
                </div>


                {content.imageUrl && (
                  <div className="w-full h-96 mt-6">
                    <img
                      src={content.imageUrl}
                      alt={content.title || "تصویر بخش"}
                      width={1200}
                      height={406}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}

                {index === 1 && (
                  <BannerComponent
                    text="بهترین روش مهاجرت مناسب با شرایط خود را نمی‌شناسید؟"
                    buttonText="رزرو وقت مشاوره"
                    buttonLink="/reservation"
                    bgFrom={settings.bannerBgFrom}
                    bgTo={settings.bannerBgTo}
                  />
                )}
                {index === 3 && (
                  <BannerSecondaryComponent
                    title="می‌خواهید سریع‌تر اقامت بگیرید؟"
                    subtitle="با کارشناسان ما در تماس باشید تا بهترین مسیر مهاجرتی را برایتان پیشنهاد دهند."
                    linkText="شروع مشاوره رایگان"
                    linkUrl="/reservation"
                  />
                )}
                {index === 7 && (
                  <BannerThirdComponent
                    title="اقامت رویایی شما نزدیک است!"
                    subtitle="با کمک کارشناسان ما بهترین مسیر مهاجرت را پیدا کنید."
                    linkText="همین حالا مشاوره بگیرید"
                    linkUrl="/reservation"
                  />
                )}
              </section>
            ))}
        </main>

        <aside className="hidden md:flex flex-col  self-start space-y-6 my-24 mx-6">
          {/* کارت دوم (الان بالاست) */}
          <div className="bg-white w-80 rounded-xl shadow-md overflow-hidden">
            <img
              src="/images/docs/gif.gif"
              alt="مشاوره مهاجرتی"
              className="w-full h-[600px] object-cover rounded-xl"
            />
          </div>


          {/* کارت اول (الان پایین‌تره) */}
          <div
            style={{
              backgroundImage: "url('/images/covers/counsulting.jpg')",
              width: "320px",
              minHeight: "400px",
            }}
            className="bg-gradient-to-b from-black/40 to-transparent bg-cover bg-center bg-no-repeat p-6 rounded-xl flex flex-col justify-between shadow-md"
          >
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-3">ویزای {country.name}</h2>
              <p className="text-sm opacity-90 mb-4">برای اطلاعات بیشتر با ما تماس بگیرید.</p>
            </div>

            <div className="mt-auto text-center">
              <Link
                href="/reservation"
                className="inline-block w-full bg-red-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-600 transition-all"
              >
                رزرو وقت مشاوره
              </Link>
            </div>
          </div>
        </aside>







      </div>
    </>
  );
}
