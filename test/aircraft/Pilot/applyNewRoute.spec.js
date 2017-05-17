import ava from 'ava';
import sinon from 'sinon';
import _isEqual from 'lodash/isEqual';

import Pilot from '../../../src/assets/scripts/client/aircraft/Pilot/Pilot';
import {
    fmsArrivalFixture,
    modeControllerFixture
} from '../../fixtures/aircraftFixtures';

const invalidRouteString = 'a..b.c.d';
const complexRouteString = 'COWBY..BIKKR..DAG.KEPEC3.KLAS';
const runwayMock = '19L';

ava('.applyNewRoute() returns an error when passed an invalid route', (t) => {
    const expectedResult = [
        false,
        {
            log: 'requested route of "a..b.c.d" is invalid',
            say: 'that route is invalid'
        }
    ];
    const pilot = new Pilot(modeControllerFixture, fmsArrivalFixture);
    const result = pilot.applyNewRoute(invalidRouteString, runwayMock);

    t.true(_isEqual(result, expectedResult));
});

ava('.applyNewRoute() calls fms._destroyLegCollection()', (t) => {
    const pilot = new Pilot(modeControllerFixture, fmsArrivalFixture);
    const _destroyLegCollectionSpy = sinon.spy(pilot._fms, '_destroyLegCollection');

    pilot.applyNewRoute(complexRouteString, runwayMock);

    t.true(_destroyLegCollectionSpy.calledOnce);
});

ava('.applyNewRoute() removes an existing route and replaces it with a new one', (t) => {
    const pilot = new Pilot(modeControllerFixture, fmsArrivalFixture);

    pilot.applyNewRoute(complexRouteString, runwayMock);

    t.true(pilot._fms.currentWaypoint.name === 'cowby');
});

ava('.applyNewRoute() returns a success message when finished successfully', (t) => {
    const expectedResult = [
        true,
        {
            log: 'rerouting to: cowby..bikkr..dag.kepec3.klas',
            say: 'rerouting as requested'
        }
    ];
    const pilot = new Pilot(modeControllerFixture, fmsArrivalFixture);
    const result = pilot.applyNewRoute(complexRouteString, runwayMock);

    t.true(_isEqual(result, expectedResult));
});
