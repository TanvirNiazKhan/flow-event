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
    <Footer container className="bg-slate-200">
      <div className="w-full ">
        <div className="grid w-full justify-around sm:flex sm:justify-around md:flex md:grid-cols-1 mt-16">
          <div>
            <img
              className="h-32 w-32"
              src="https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/300813538_389909113295977_5089751067758201927_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=e2an-GSiRdIAX84Ytjm&_nc_ht=scontent.fdac31-1.fna&oh=00_AfAC6g2b6Dk3aUySvtns5D0d705jqD2boWSudukQxSgraA&oe=65D8E642"
            ></img>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="about" />
              <FooterLinkGroup col>
                <FooterLink href="#"> EventFlow</FooterLink>
                <FooterLink href="#">EventFlow</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink href="#">Github</FooterLink>
                <FooterLink href="#">Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="EventFlow™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon
              href="https://www.linkedin.com/in/tanvir-niaz-khan/"
              target="__blank"
              icon={BsLinkedin}
            />
            <FooterIcon href="#" target="__blank" icon={BsTwitter} />
            <FooterIcon
              href="https://github.com/TanvirNiazKhan"
              target="__blank"
              icon={BsGithub}
            />
            <FooterIcon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
export default Footers;
