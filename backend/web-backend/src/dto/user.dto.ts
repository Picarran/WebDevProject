import { Rule, RuleType } from '@midwayjs/validate';


export class User {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}