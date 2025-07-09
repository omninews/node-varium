import Validators from "./validators.js";
import { suggestNameError } from "../util/suggest.js";

let logName;
let logValue;

try {
  // eslint-disable-next-line
  const debug = (await import("debug")).default;
  logName = debug("varium:validate:name");
  logValue = debug("varium:validate:value");
} catch (e) {
  logName = () => {};
  logValue = () => {};
}

export default function validate(customValidators, manifest, env) {
  const validators = { ...Validators, ...customValidators };

  return manifest.map((definition) => {
    const validator = validators[definition.type];
    const envValue = env[definition.name];
    const envDefault = definition.default;

    if (!validator) {
      const errorMessage = suggestNameError(
        Object.keys(validators),
        definition.type
      );

      return {
        error$: `The type ${definition.type} for env var "${definition.name}" does not exist.\n${errorMessage}`,
      };
    }

    if (envValue === undefined && envDefault === undefined) {
      return {
        error$: `Env var "${definition.name}" requires a value.`,
      };
    }

    logName(definition.name);
    logValue(`Value: ${envValue}`);
    logValue(`Default: ${envDefault}`);

    if (envDefault !== undefined) {
      try {
        validator(envDefault);
      } catch (e) {
        return {
          error$: `Default value for "${definition.name}" is invalid: ${e.message}`,
        };
      }
    }

    const value =
      envValue === undefined || envValue === "" ? envDefault : envValue;

    try {
      return {
        [definition.name]: validator(value),
      };
    } catch (e) {
      return {
        error$: `Value for "${definition.name}" is invalid: ${e.message}`,
      };
    }
  });
}
