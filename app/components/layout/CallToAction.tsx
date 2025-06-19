import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import SignupModal from "@/app/(memorybook)/memorybook/components/ui/auth/SignupModal";
import ButtonNextLink from "../ui/button/ButtonNextLink";
import AuthContext from "@/app/context/AuthContext";
import SignupOrDashboardButton from "@/app/(memorybook)/memorybook/components/ui/auth/SignupOrDashboardButton";

type CallToActionProps = {
  lists: string[];
  contents: string[];
  signUp?: boolean;
  href?: string;
};

const CallToAction: React.FC<CallToActionProps> = ({
  lists,
  contents,
  signUp = false,
  href,
}) => {
  return (
    <AnimatedItem elementType="div" animation="fadeInVariants">
      <ul className="mb-8 mx-auto w-full md:w-[50%] pt-6 pb-3 px-6 border border-dashed rounded border-itinerary-borderBlack">
        {lists.map((list) => (
          <li key={list} className="mb-4 text-red-500">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-sky-700 mr-4"
            />
            {list}
          </li>
        ))}
      </ul>
      {contents.map((content) => (
        <p key={content} className="text-center mb-6">
          {content}
        </p>
      ))}
      {signUp ? (
        <AnimatedItem
          elementType="div"
          animation="fadeInAndScaleVariants"
          className="text-center py-4"
        >
          <AuthContext>
            <SignupOrDashboardButton />
          </AuthContext>
        </AnimatedItem>
      ) : (
        href && (
          <div className="text-center">
            <ButtonNextLink href={href} className="rounded">
              詳細はコチラ
            </ButtonNextLink>
          </div>
        )
      )}
    </AnimatedItem>
  );
};

export default CallToAction;
