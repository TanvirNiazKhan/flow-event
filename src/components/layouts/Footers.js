import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
  BsLinkedin,
} from "react-icons/bs";

function Footers() {
  return (
    <Footer container className="bg-gradient-to-br from-purple-900 to-blue-900 text-white mt-16">
      <div className="w-full ">
        <div className="grid w-full justify-around sm:flex sm:justify-around md:flex md:grid-cols-1 mt-16">
          <div>
            <img
              className="h-24 w-24"
              src="https://media.licdn.com/dms/image/C4E0BAQFa4a4sDSQ2Tw/company-logo_200_200/0/1630621716683/flow_events_agency_logo?e=2147483647&v=beta&t=Jy5ZfBnCZL5SCCkQsGQNBPvTnZM6UbUs3NnHHBUq1Ww"
            ></img>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle className="text-white" title="about" />
              <FooterLinkGroup col>
                <FooterLink className="text-white" href="#"> EventFlow</FooterLink>
                <FooterLink className="text-white" href="#">EventFlow</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle className="text-white" title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink className="text-white" href="#">Github</FooterLink>
                <FooterLink className="text-white" href="#">Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle className="text-white" title="Legal" />
              <FooterLinkGroup col>
                <FooterLink className="text-white" href="#">Privacy Policy</FooterLink>
                <FooterLink className="text-white" href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright className="text-white" href="#" by="EventFlow™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon className="text-white" href="#" icon={BsFacebook} />
            <FooterIcon
              className="text-white"
              href="https://www.linkedin.com/in/tanvir-niaz-khan/"
              target="__blank"
              icon={BsLinkedin}
            />
            <FooterIcon className="text-white" href="#" target="__blank" icon={BsTwitter} />
            <FooterIcon
              className="text-white"
              href="https://github.com/TanvirNiazKhan"
              target="__blank"
              icon={BsGithub}
            />
            <FooterIcon className="text-white" href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
export default Footers;