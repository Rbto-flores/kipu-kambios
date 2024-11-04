import Hash "mo:base/Hash";
import Nat32 "mo:base/Nat32";
import Nat "mo:base/Nat";

module {

  public module User {
    public type Id = { #user : RawId };
    public func idHash(i : Id) : Hash.Hash {
      switch (i) { case (#user n) hash n };
    };
    public func idEqual(i : Id, j : Id) : Bool { i == j };
    public type RawId = Nat;

    public type Edit = {
      // "Edit": another name could be "Info"
      name : Text;
      bioBlurb : Text; // one-liner, like on Twitter
    };

    public type Stamp = {
      createTime : Int; // milliseconds since Unix epoch
    };

    public type State = {
      edit : Edit;
      stamp : Stamp;
    };

    public type View = {
      id : RawId;
      isModerator : Bool;
    };
  };

  public module https {
    public type Timestamp = Nat64;

    //1. Type that describes the Request arguments for an HTTPS outcall
    //See: /docs/current/references/ic-interface-spec#ic-http_request
    public type HttpRequestArgs = {
      url : Text;
      max_response_bytes : ?Nat64;
      headers : [HttpHeader];
      body : ?[Nat8];
      method : HttpMethod;
      transform : ?TransformRawResponseFunction;
    };

    public type HttpHeader = {
      name : Text;
      value : Text;
    };

    public type HttpMethod = {
      #get;
      #post;
      #head;
    };

    public type HttpResponsePayload = {
      status : Nat;
      headers : [HttpHeader];
      body : [Nat8];
    };

    //2. HTTPS outcalls have an optional "transform" key. These two types help describe it.
    //"The transform function may, for example, transform the body in any way, add or remove headers,
    //modify headers, etc. "
    //See: /docs/current/references/ic-interface-spec#ic-http_request

    //2.1 This type describes a function called "TransformRawResponse" used in line 14 above
    //"If provided, the calling canister itself must export this function."
    //In this minimal example for a `GET` request, you declare the type for completeness, but
    //you do not use this function. You will pass "null" to the HTTP request.
    public type TransformRawResponseFunction = {
      function : shared query TransformArgs -> async HttpResponsePayload;
      context : Blob;
    };

    //2.2 These types describes the arguments the transform function needs
    public type TransformArgs = {
      response : HttpResponsePayload;
      context : Blob;
    };

    public type CanisterHttpResponsePayload = {
      status : Nat;
      headers : [HttpHeader];
      body : [Nat8];
    };

    public type TransformContext = {
      function : shared query TransformArgs -> async HttpResponsePayload;
      context : Blob;
    };

    //3. Declaring the management canister which you use to make the HTTPS outcall
    public type IC = actor {
      http_request : HttpRequestArgs -> async HttpResponsePayload;
    };
  };

  /// Computes a hash from the least significant 32-bits of `n`, ignoring other bits.
  func hash(n : Nat) : Hash.Hash {
    let j = Nat32.fromNat(n);
    hashNat8([
      j & (255 << 0),
      j & (255 << 8),
      j & (255 << 16),
      j & (255 << 24),
    ]);
  };

  /// Jenkin's one at a time:
  ///
  /// https://en.wikipedia.org/wiki/Jenkins_hash_function#one_at_a_time
  ///
  func hashNat8(key : [Hash.Hash]) : Hash.Hash {
    var hash : Nat32 = 0;
    for (natOfKey in key.vals()) {
      hash := hash +% natOfKey;
      hash := hash +% hash << 10;
      hash := hash ^ (hash >> 6);
    };
    hash := hash +% hash << 3;
    hash := hash ^ (hash >> 11);
    hash := hash +% hash << 15;
    return hash;
  };

};
