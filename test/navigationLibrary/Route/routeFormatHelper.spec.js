import ava from 'ava';
import _isEqual from 'lodash/isEqual';

import { routeFormatHelper } from '../../../src/assets/scripts/client/navigationLibrary/Route/routeStringFormatHelper';

ava('throws when passed invalid parameters', (t) => {
    t.throws(() => routeFormatHelper());
    t.throws(() => routeFormatHelper([]));
    t.throws(() => routeFormatHelper({}));
    t.throws(() => routeFormatHelper(42));
    t.throws(() => routeFormatHelper(false));
});

ava('does not throw when it receives a string', (t) => {
    t.notThrows(() => routeFormatHelper('a.b.c e.f.g'));
    t.notThrows(() => routeFormatHelper('a.b.c'));
});

ava('returns an array when passed a Direct route string', (t) => {
    const result = routeFormatHelper('a..b..c');

    t.true(_isEqual(result, ['a', 'b', 'c']));
});

ava('returns an array when passed a Procedure route string ', (t) => {
    const result = routeFormatHelper('a.b.c');

    t.true(_isEqual(result, ['a.b.c']));
});

ava('returns an array when passed a mix of Direct and Procedure route strings', (t) => {
    const result = routeFormatHelper('a.b.c..d..e.f.g');

    t.true(_isEqual(result, ['a.b.c', 'd', 'e.f.g']));
});

ava('returns an array when passed a Procedure route string with multilinks', (t) => {
    const result = routeFormatHelper('a.b.c.d.e.f.g');

    t.true(_isEqual(result, ['a.b.c', 'c.d.e', 'e.f.g']));
});

ava('returns an array when passed a Procedure route string with multilinks and Direct route strings', (t) => {
    const result = routeFormatHelper('a.b.c..d..e.f.g.h.i..j..k');

    t.true(_isEqual(result, ['a.b.c', 'd', 'e.f.g', 'g.h.i', 'j', 'k']));
});
