import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CmsEditor from "../../components/CmsEditor";
import { CMS_COOKIE_NAME, isCmsCookieValid } from "../../lib/cms-auth";
import { getCmsData } from "../../lib/cms-store";

export default async function CmsPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(CMS_COOKIE_NAME)?.value;

  if (!isCmsCookieValid(authCookie)) {
    redirect("/cms/login");
  }

  const cmsData = await getCmsData();

  return (
    <CmsEditor
      initialProducts={cmsData.products}
      initialPartners={cmsData.partners}
      initialHome={cmsData.home}
      initialAbout={cmsData.about}
      initialPartnersPage={cmsData.partnersPage}
      initialGallery={cmsData.gallery}
      updatedAt={cmsData.updatedAt}
    />
  );
}
