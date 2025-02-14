import { motion } from "framer-motion";

const Register = () => {
  const text = "Wavy Text Effect!".split("");

  return (
    <h1>
      <i>
        {text.map((char, index) => (
          <motion.span
            key={index}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2, // Delay each letter
            }}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        ))}
      </i>
    </h1>
  );
};

export default Register;
