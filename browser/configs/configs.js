import {configs_qpublic} from './configs_qpublic.js';
import {configs_other} from './configs_other.js';
import {configs_tax} from './configs_tax.js';

export var configs = {
    ...configs_qpublic,
    ...configs_other,
    ...configs_tax,
}