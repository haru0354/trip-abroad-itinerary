import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import SignupButton from "./ui/SignupButton";
import Button from "./ui/Button";

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
      <ul className="my-12 p-6 border border-dashed border-gray-500">
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
        <p key={content} className="text-center text-gray-700 mb-6">
          {content}
        </p>
      ))}
      {signUp ? (
        <AnimatedItem
          elementType="div"
          animation="fadeInAndScaleVariants"
          className="text-center py-4"
        >
          <SignupButton />
        </AnimatedItem>
      ) : (
        href && (
          <Button color="blue" size="normal">
            詳細はコチラ
          </Button>
        )
      )}
    </AnimatedItem>
  );
};

export default CallToAction;
