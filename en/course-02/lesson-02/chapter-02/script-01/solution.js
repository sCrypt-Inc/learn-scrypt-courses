import "./mimc7" as mimc7;

def isShipHit(field x, field y, field o, field size, field targetX, field targetY) -> bool {
    return ((o == 0 && targetX == x && targetY >= y && targetY <= y + size - 1) || (o == 1 && targetY == y && targetX >= x && targetX <= x + size - 1));
}

def main(private field carrierX, private field carrierY, private field carrierO, private field battleshipX, private field battleshipY, private field battleshipO, private field cruiserX, private field cruiserY, private field cruiserO, private field submarineX, private field submarineY, private field submarineO, private field destroyerX, private field destroyerY, private field destroyerO, field shipHash, field targetX, field targetY, bool hit) {
    // combined fleet state
    field shipState = carrierX + carrierY * 16 + carrierO * (16**2) + battleshipX * (16**3) + battleshipY * (16**4) + battleshipO * (16**5) + cruiserX * (16**6) + cruiserY * (16**7) + cruiserO * (16**8) + submarineX * (16**9) + submarineY * (16**10) + submarineO * (16**11) + destroyerX * (16**12) + destroyerY * (16**13) + destroyerO * (16**14);

    // fleet hash check
    assert(mimc7::<91>(shipState, 0) == shipHash);

    // fire range check
    assert(targetX >= 0 && targetX <= 9 && targetY >= 0 && targetY <= 9);

    // hit check
    bool isCarrierHit = isShipHit(carrierX, carrierY, carrierO, 5, targetX, targetY);
    bool isBattleshipHit = isShipHit(battleshipX, battleshipY, battleshipO, 4, targetX, targetY);
    bool isCruiserHit = isShipHit(cruiserX, cruiserY, cruiserO, 3, targetX, targetY);
    bool isSubmarineHit = isShipHit(submarineX, submarineY, submarineO, 3, targetX, targetY);
    bool isDestroyerHit = isShipHit(destroyerX, destroyerY, destroyerO, 2, targetX, targetY);
    assert(hit == (isCarrierHit || isBattleshipHit || isCruiserHit || isSubmarineHit || isDestroyerHit));

    return;
}