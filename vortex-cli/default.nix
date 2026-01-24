{
  lib,
  stdenvNoCC,
  makeWrapper,
  yt-dlp,
  jq,
  fzf,
  mpv,
  ffmpeg,
  gum,
}:
let
  deps = [
    yt-dlp
    jq
    fzf
    mpv
    ffmpeg
    gum
  ];
in
stdenvNoCC.mkDerivation {
  pname = "vortex-cli";
  version = "git";
  src = ./.;

  nativeBuildInputs = [ makeWrapper ];

  installPhase = ''
    runHook preInstall

    install -Dm755 vortex-cli -t $out/bin
    wrapProgram $out/bin/vortex-cli \
      --prefix PATH : ${lib.makeBinPath deps}

    runHook postInstall
  '';

  meta.mainProgram = "vortex-cli";
}
